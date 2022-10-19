const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const book = require("../models/book");

const userController = {
  register: async (req, res, next) => {
    try {
      const passHash = await bcrypt.hash(req.body.password, 10);
      const [user, created] = await db.user.findOrCreate({
        where: { email: req.body.email },
        defaults: {
          ...req.body,
          password: passHash,
        },
      });
      if (created) {
        console.log("New User Created:", user);
        next();
        // return res.status(201).json("New User Created");
      } else {
        return res.status(201).json("Email already exists");
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to register new user" });
    }
  },
  login: async (req, res) => {
    let errMsg = "User email or password is incorrect";
    let user = null;
    try {
      user = await db.user.findOne({ where: { email: req.body.email } });
      if (!user) {
        return res.status(401).json({ error: errMsg });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "failed to get user" });
    }

    const isPasswordOk = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordOk) {
      return res.status(401).json({ error: errMsg });
    }

    // generate JWT and return as response
    //even with signature  jwt does not solve confidentiality,it only ensures that is not tempered with
    //we can be sure that the pay load is the original sender details, signature is used to verify that its is authentic
    //secret is set in every server, so any server can check its authentication
    //change the schema obj to plain js object
    const userData = {
      userId: user.id,
      email: user.email,
    };

    //gnerate the token
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 120, // 1 hour
        data: userData,
      },
      process.env.JWT_SECRET
    );
    // store token cookie with the respond
    return res
      .cookie("token", token, {
        httpOnly: true, //use at development
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Logged in successfully" });
  },
  logout: async (req, res) => {
    return res
      .clearCookie("token")
      .status(200)
      .json({ message: "Successfully logged out" });
  },
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
