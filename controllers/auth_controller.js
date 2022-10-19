const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
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
  }
};

module.exports = authController;