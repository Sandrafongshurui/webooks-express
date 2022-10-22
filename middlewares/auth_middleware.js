const jwt = require("jsonwebtoken");

//middleware for each protected route, check for token, indicates user logged in
module.exports = (req, res, next) => {
    const token = req.cookies.token;
    console.log(req.cookies.token)
    if (!token) {
      return res.status(403).json("Only authorized users allowed");
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        //modify my req for easy access
        //res.locals.userAuthId = verified.data.userId
        req.userId = verified.data.userId;
        req.email = verified.data.email;
        return next();
      } catch {
        return res.status(403).json("Only authorized users allowed");
      }
  };