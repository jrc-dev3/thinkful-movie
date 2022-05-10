const router = require("express").Router({mergeParams: true})
const notAllowed = require("../utils/notAllowed")
const moviesCtl = require("./movies.ctl")
const theatersCtl = require("../theaters/theaters.ctl")
const reviewsCtl = require("../reviews/reviews.ctl")

router
    .route("/:movieId/theaters")
    .get(theatersCtl.list)
    .all(notAllowed)

router
    .route("/:movieId/reviews")
    .get(reviewsCtl.list)
    .all(notAllowed)

router
    .route("/:movieId")
    .get(moviesCtl.read)
    .all(notAllowed)

router
    .route("/")
    .get(moviesCtl.list)
    .all(notAllowed)


module.exports = router
