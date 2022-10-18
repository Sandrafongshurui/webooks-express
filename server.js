require("dotenv").config();

const express = require("express");
const port = process.env.PORT || 8000;
const cors = require("cors");
const bookRouter = require("./routers/book_routes");
const userRouter = require("./routers/user_routes");
console.log("READING SERVER.JS");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.json({
    message: "success",
  });
});

//app.use('/api/v1/books', bookRouter)
//app.use('/api/v1/user', userRouter)

//in config file, got dev, test, prod, following index.js, line 8, its using dev for the environment.
//connecting to that database
app.listen(process.env.PORT, async () => {
  console.log(`Express server listening on port ${port}`);
});
