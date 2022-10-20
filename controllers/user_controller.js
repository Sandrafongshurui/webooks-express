const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const book = require("../models/book");

const userController = {
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
      user = await db.user.findOne({ where: { id: userAuth } });
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
    let user = null;
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
};

module.exports = userController;
