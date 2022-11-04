const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode")
const {DateTime} = require("luxon")

//middleware for each protected route, check for token, indicates user logged in
module.exports = (req, res, next) => {
  const token = req.cookies.token;
  console.log("auth middle ware");
  console.log(req.cookies.token);
  if (!token) {
    return res.status(403).json("Only authorized users allowed");
  }
  try {
    // check if token expired, in unit 2 is like the max time thing in session
    // if expired, purge localstorage, redirect to login
    const user = jwt_decode(token);
    console.log(user);
    const now = DateTime.now().toUnixInteger();

    //this exp is issued with the token.....so we cant change it
    if (user.exp < now) {
      // destroy the cookie
      console.log("check expirey date")
      return res.status(403).json("Only authorized users allowed");
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    //modify my req for easy access
    //res.locals.userAuthId = verified.data.userId
    req.userId = verified.data.userId;
    req.email = verified.data.email;
    return next();
  } catch (err) {
    console.log(err);
    return res.status(403).json("Only authorized users allowed");
  }
};
