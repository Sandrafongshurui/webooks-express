require('dotenv').config({
    // path:
    // //when npm run, run either dev or prod
    //     process.env.ENVIRONMENT === "production"
    //         ? "./.env.production"
    //         : "./.env.development"
})

const express = require('express')
const cors = require('cors')
const bookRouter = require('./routers/book_routes')
const userRouter = require('./routers/user_routes')


const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(cors({
  origin: "*"

}))
app.get("/", (req, res) => {
    res.json({
        message: "success"
    });
});

app.use('/api/v1/books', bookRouter)
//app.use('/api/v1/user', userRouter)


//in config file, got dev, test, prod, following index.js, line 8, its using dev for the environment.
//connecting to that database
app.listen(process.env.PORT, async () => {
    console.log(
        `${process.env.ENVIRONMENT} express server listening on port ${process.env.PORT}`
    )
})

