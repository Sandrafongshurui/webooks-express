require("dotenv").config();
const session = require("express-session");
const express = require("express");
const cors = require("cors");
const bookRouter = require("./routers/book_routes");
const userRouter = require("./routers/user_routes");
const authRouter = require("./routers/auth_routes");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 8000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(session({
//   resave:false,
//   saveUnintialized: false,
//   secret: "session",
//   cookie:{
//     maxAge: 1000 * 60 * 60,
//     secure:false,//true means https not http. requried cos same site is none, so you set up a proxy to act as middle man to set the cookie in FE
//   }
// }))

//credentials true expects the cookies from FE
// app.set("trust proxy", 1)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/", userRouter);
app.use("/api/v1/auth", authRouter);

//in config file, got dev, test, prod, following index.js, line 8, its using dev for the environment.
//connecting to that database
app.listen(port, async () => {
  console.log(`Express server listening on port ${port}`);
});
