const router = require("express").Router({mergeParams: true})
const methodNotAllowed = require("../utils/methodNotAllowed")
const moviesCtl = require("./movies.ctl")
const theatersCtl = require("../theaters/theaters.ctl")
const reviewsCtl = require("../reviews/reviews.ctl")

router
    .route("/:movieId/theaters")
    .get(theatersCtl.list)
    .all(methodNotAllowed)

router
    .route("/:movieId/reviews")
    .get(reviewsCtl.list)
    .all(methodNotAllowed)

router
    .route("/:movieId")
    .get(moviesCtl.read)
    .all(methodNotAllowed)

router
    .route("/")
    .get(moviesCtl.list)
    .all(methodNotAllowed)


module.exports = router
