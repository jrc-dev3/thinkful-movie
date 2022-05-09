if (process.env.USER) require("dotenv").config();
const express = require("express");
const moviesRouter = require("./movies/movies.router")
const reviewsRouter = require("./reviews/reviews.router")
const theatersRouter = require("./theaters/theaters.router")
const pathNotFoundHandler = (req,res,next) => {
    next({
        status: 404,
        message: `Path not found: ${req.originalUrl}`
    })
}
const errorHandler = (err,req,res,next) => {
    const { status=500, message="Something went wrong!"} = err
    res.status(status).json({error: message})
}
const app = express();

app.use("/movies", moviesRouter)
app.use("/reviews", reviewsRouter)
app.use("/theaters", theatersRouter)
app.use(pathNotFoundHandler)
app.use(errorHandler)

module.exports = app;
