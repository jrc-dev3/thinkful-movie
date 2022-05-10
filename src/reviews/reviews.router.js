const router = require("express").Router({mergeParams: true})
const notAllowed = require("../utils/notAllowed")
const reviewsCtl = require("./reviews.ctl")

router
    .route("/:reviewId")
    .put(reviewsCtl.update)
    .delete(reviewsCtl.delete)
    .all(notAllowed)


module.exports = router
