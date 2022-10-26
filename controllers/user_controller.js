const db = require("../models");
const dateMethods = require("../utils/date_methods");
const awsMethods = require("../middlewares/aws_methods");
const stringMethods = require("../utils/string_methods");

const userController = {
  //profile
  showProfile: async (req, res) => {
    let user = null;
    let userAuth = ; //res.locals.userAuthId;
    console.log("----->", userAuth);
    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }

    try {
      user = await db.user.findByPk(userAuth);
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
    let userAuth = ; //this is where the token is saved
    console.log(req.file);
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
      let epubUrl = null
      let bookImgUrl = null 
      req.uploadedData.forEach(element => {
        if(element.Bucket === "webooks-epub-files")
        {
          epubUrl= element.Location
        }else{
          bookImgUrl= element.Location
        }
        
      });
      const book = await db.book.create({
        ...req.body,
        epubUrl,
        bookImgUrl
      });
      console.log("New book Created:", book);
      return res.status(201).json("New book Created");
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to create new book" });
    }
  },
  editBook: async (rew, res) => {
    let userAuth = ; //this is where the token is saved
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
    let userAuth = ; //this is where the token is saved
    // console.log(req.file)
    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }
    try {
      //find all the loans, include the user table as well
      loans = await db.loan.findAll({
        include: { model: db.book },
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
      const userId = req.NextUserIdFromReserve || ;
      const bookId = req.bookId || req.params.bookId;
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
        // const loanedBook = await db.book.findByPk(loan.bookId);
        await db.book.increment("totalLoans", {
          by: 1,
          where: { id: req.params.bookId },
        });
        await db.book.decrement("copiesAvailable", {
          by: 1,
          where: { id: req.params.bookId },
        });
        return res
          .status(201)
          .json(
            "New loan Created, increase loan number, deacrese copies available"
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
    let userAuth = ; //this is where the token is saved
    // console.log(req.file)
    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }
    try {
      const loan = await db.loan.findByPk(req.params.id);
      //check the days b
      const arrayOfDates = dateMethods.getDatesInRange(
        new Date(),
        loan.dueDate
      );
      //only less than 3 days then can renew
      if (arrayOfDates.length < 4) {
        await db.loan.update(
          { dueDate: dateMethods.addDays(loan.dueDate, 21) },
          {
            where: { id: req.params.id },
          }
        );
        return res.status(200).json("Loan renewed");
      } else {
        const daysToRenewal = arrayOfDates.length - 4;
        return res
          .status(200)
          .json(
            `It's too early for renewal! You will be able to renew it in ${daysToRenewal} days`
          );
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "failed to renew book" });
    }
  },
  //use this for scheduled jobs
  returnLoan: async (req, res, next) => {
    let userAuth = ; //this is where the token is saved
    // console.log(req.file)
    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }
    try {
      // const loan = await db.loan.findOne({
      //   include: [{ model: db.book, attributes: ["id", "copiesAvailable"] }],
      //   where: { id: req.params.id },
      // });
      // console.log("---->", loan);
      const book = await db.book.increment("copiesAvailable", {
        by: 1,
        where: { id: req.params.bookId },
      });
      //this shld delete annotations FK
      const destroyloan = await db.loan.destroy({
        where: { id: req.params.loanId },
      });
      console.log("Loan returned");
      next();
      // return res.status(200).json("Loan returned");
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "failed to return loan" });
    }
  },
  //after return loan
  checkReserveForBook: async (req, res, next) => {
    //check the rserves table if theres this book, sort with the earliest date first
    const reserves = await db.reserve.findAll({
      order: [["createdAt", "DESC"]],
      where: { bookId: req.params.bookId },
    });

    if (reserves.length > 0) {
      //create a loan for this user
      req.NextUserIdFromReserve = reserves[0].userId;
      next();
    } else {
      return res.status(200).json("Loan returned, no other user reserve it");
    }
  },
  openBook: async (req, res) => {
    let userAuth = ; //res.locals.userAuthId;
    console.log("----->", userAuth);
    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }

    try {
      const loan = await db.loan.findOne({
        include: { model: db.book },
        where: { id: req.params.loanId },
      });

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
    let userAuth = ; //res.locals.userAuthId;
    console.log("----->", userAuth);
    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }

    try {
      const loan = await db.loan.findByPk(req.params.loanId);
      await db.loan.update(
        { bookProgress: req.query.pageNum },
        {
          where: { id: req.params.loanId },
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
    let userAuth = ; //this is where the token is saved
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
        where: { userId: , bookId: req.params.bookId },
        defaults: {
          userId: ,
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
    let userAuth = ; //this is where the token is saved
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
    let userAuth = ; //this is where the token is saved
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
      const [favourite, created] = await db.favourite.findOrCreate({
        where: { userId: , bookId: req.params.bookId },
        defaults: {
          userId: ,
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
    let userAuth = ; //this is where the token is saved
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
      return res.status(200).json("Favourite cancelled");
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "failed to cancel avourite" });
    }
  },
  //notifications
  listNotifications: async (req, res) => {
    let notifications = null;
    let userAuth = ; //this is where the token is saved
    // console.log(req.file)
    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }

    try {
      //find all the unread notifications
      notifications = await db.notification.findAll({
        where: { userId: userAuth, status: "unread" },
      });
      console.log(notifications);
      return res.json(notifications);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "failed to get user's notifications" });
    }
  },
  readNotification: async (req, res) => {
    let notification = null;
    let userAuth = ; //this is where the token is saved
    // console.log(req.file)
    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }

    try {
      notification = await db.notification.update(
        { status: "read" },
        { where: { id: req.params.id } }
      );
      console.log(notification);
      return res.status(200).json("Notification read");
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "failed to read user's notifications" });
    }
  },
  deleteNotification: async (req, res) => {
    let notification = null;
    let userAuth = ; //this is where the token is saved
    // console.log(req.file)
    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }

    try {
      notification = await db.notification.destroy({
        where: { id: req.params.id },
      });
      console.log(notification);
      return res.status(200).json("Notification deleted");
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "failed to delete user's notifications" });
    }
  },
};

module.exports = userController;
