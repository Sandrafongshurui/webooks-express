const db = require("../models");
const dateMethods = require("../utils/date_methods");
const stringMethods = require("../utils/string_methods");

const userController = {
  //profile
  showProfile: async (req, res) => {
    let user = null;
    let userAuth = req.userId; //res.locals.userAuthId;
    console.log("----->", userAuth);
    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }

    try {
      user = await db.user.findByPk({ id: userAuth });
      if (!user) {
        return res.status(404).json({ error: "user does not exsits" });
      }
      console.log(user);
      return res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "failed to get user" });
    }
  },
  editProfile: async (req, res) => {
    let userAuth = req.userId; //this is where the token is saved
    // console.log(req.file)
    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }

    try {
      await db.user.update(
        { ...req.body, profileImgUrl: req.file },
        {
          where: { id: userAuth },
        }
      );
      return res.status(200).json("Profile edited");
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "failed to get user" });
    }
  },
  //books
  createBook: async (req, res) => {
    try {
      const { title, author, epubUrl } = req.body;
      const [book, created] = await db.book.findOrCreate({
        where: { title, author, epubUrl },
        defaults: {
          ...req.body,
        },
      });
      if (created) {
        console.log("New book Created:", book);
        return res.status(201).json("New book Created");
      } else {
        return res.status(201).json("Book already exists");
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to create new book" });
    }
  },
  editBook: async (rew, res) => {
    let userAuth = req.userId; //this is where the token is saved
    // console.log(req.file)
    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }

    try {
      await db.book.update(
        { ...req.body },
        {
          where: { id: req.params.id },
        }
      );
      return res.status(200).json("Book edited");
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "failed to edit book" });
    }
  },

  //loans
  listLoans: async (req, res) => {
    let loans = null;
    let userAuth = req.userId; //this is where the token is saved
    // console.log(req.file)
    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }
    try {
      //find all the loans, include the user table as well
      loans = await db.loan.findAll({
        include: { model: db.user },
        where: { userId: userAuth },
      });

      console.log(loans);
      return res.json(loans);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "failed to get user's loans" });
    }
  },
  createLoan: async (req, res) => {
    try {
      //check if its auto (from after cancel loan), or is user ownself create loan
      userId = req.NextUserIdFromReserve || req.userId,
      bookId = req.bookId || req.params.bookId
      const [loan, created] = await db.loan.findOrCreate({
        where: {
          userId,
          bookId,
        },
        defaults: {
          userId,
          bookId,
          bookProgress: "0",
          dueDate: dateMethods.addDays(new Date(), 21),
        },
      });
      if (created) {
        const book = await db.book.update(
          {
            totalLoans: (totalLoans += 1),
            copiesAvailable: (copiesAvailable -= 1),
          },
          { where: { id: loan.bookdId } }
        );
        console.log("New loan Created:", loan);
        console.log("increase Book Total Loans", book);
        return res
          .status(201)
          .json(
            "New User Created, increase loan number, deacrese copies available"
          );
      } else {
        return res.status(201).json("Loan already exists");
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to create new loan" });
    }
  },
  renewLoan: async (req, res) => {
    let userAuth = req.userId; //this is where the token is saved
    // console.log(req.file)
    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }
    try {
      const loan = await db.loan.findByPk(req.params.id);
      await db.loan.update(
        { dueDate: dateMethods.addDays(loan.dueDate, 21) },
        {
          where: { id: req.params.id },
        }
      );
      return res.status(200).json("Loan renewed");
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "failed to edit book" });
    }
  },
  //use this for scheduled jobs
  returnLoan: async (req, res) => {
    let userAuth = req.userId; //this is where the token is saved
    // console.log(req.file)
    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }
    try {
      const loan = await db.loan.findAll({
        include: { model: db.book },
        where: { id: req.params.id },
      });
      const book = await db.book.update(
        { copiesAvialble: (loan.book.copiesAvailable += 1) },
        { where: { id: loan.book.id } }
      );
      req.bookId = loan.book.id;
      //this shld delete annotations FK
      const destroyloan = await db.loan.destroy({
        where: { id: req.params.id },
      });
      console.log("Loan returned")
      next();
      // return res.status(200).json("Loan returned");
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "failed to return loan" });
    }
  },
  //after return loan
  checkReserveForBook: async (req, res) => {
    //check the rserves table if theres this book, sort with the earliest date first
    const reserves = await db.reserve.findAll({
      order: ["createdAt", "DESC"],
      where: { bookId: req.bookId },
    });

    if (reserves.length > 0) {
      //create a loan for this user
      req.NextUserIdFromReserve = reserves[0].userId;
      next();
    }else{
     return res.status(200).json("Loan returned, no other user reserve it");
    }
  },
  openBook: async (req, res) => {
    let userAuth = req.userId; //res.locals.userAuthId;
    console.log("----->", userAuth);
    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }

    try {
      const loan = await db.loan.findByPk({ id: req.params.id });
      if (!loan) {
        return res.status(404).json({ error: "loan does not exsits" });
      }
      console.log(loan);
      return res.json(loan);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "failed to get loan" });
    }
  },
  closeBook: async (req, res) => {
    let userAuth = req.userId; //res.locals.userAuthId;
    console.log("----->", userAuth);
    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }

    try {
      const loan = await db.loan.findByPk({ id: req.params.id });
      await db.loan.update(
        { bookProgress: req.query.pageNum },
        {
          where: { id: req.params.id },
        }
      );
      console.log(loan);
      return res.status(200).json("Loan page progress updated");
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "failed to update page progress" });
    }
  },
  //reserves
  listReserves: async (req, res) => {
    let reserves = null;
    let userAuth = req.userId; //this is where the token is saved
    // console.log(req.file)
    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }

    try {
      //find all the reserves, include the book table as well
      reserves = await db.reserve.findAll({
        include: { model: db.book },
        where: { userId: userAuth },
      });
      console.log(reserves);
      return res.json(reserves);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "failed to get user's reserves" });
    }
  },
  createReserve: async (req, res) => {
    try {
      const [reserve, created] = await db.reserve.findOrCreate({
        where: { userId: req.userId, bookId: req.params.bookId },
        defaults: {
          userId: req.userId,
          bookId: req.params.bookId,
        },
      });
      if (created) {
        console.log("New reserve Created:", reserve);
        return res.status(201).json("New Reserve Created");
      } else {
        return res.status(201).json("Reserve already exists");
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to create new reserve" });
    }
  },
  cancelReserve: async (req, res) => {
    let userAuth = req.userId; //this is where the token is saved
    // console.log(req.file)
    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }
    try {
      const reserve = await db.reserve.destroy({
        where: { id: req.params.id },
      });
      return res.status(200).json("Reserve cancelled");
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "failed to cancel reserve" });
    }
  },
  //favourites
  listFavourites: async (req, res) => {
    let favourites = null;
    let userAuth = req.userId; //this is where the token is saved
    // console.log(req.file)
    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }

    try {
      //find all the favourites, include the book table as well
      favourites = await db.favourite.findAll({
        include: { model: db.book },
        where: { userId: userAuth },
      });
      console.log(favourites);
      return res.json(favourites);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "failed to get user's loans" });
    }
  },
  createFavourite: async (req, res) => {
    try {
      const [favourite, created] = await db.reserve.findOrCreate({
        where: { userId: req.userId, bookId: req.params.bookId },
        defaults: {
          userId: req.userId,
          bookId: req.params.bookId,
        },
      });
      if (created) {
        console.log("New favourite Created:", favourite);
        return res.status(201).json("New favourite Created");
      } else {
        return res.status(201).json("favourite already exists");
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to create new favourite" });
    }
  },
  deleteFavourite: async (req, res) => {
    let userAuth = req.userId; //this is where the token is saved
    // console.log(req.file)
    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }
    try {
      const favourite = await db.favourite.destroy({
        where: { id: req.params.id },
      });
      return res.status(200).json("Reserve cancelled");
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "failed to cancel reserve" });
    }
  },

  
};

module.exports = userController;
