require("dotenv").config();
const {Client} = require("pg");
const { Sequelize } = require("sequelize");

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

app.use(
  cors({
    origin: "http://localhost:3000/",
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
