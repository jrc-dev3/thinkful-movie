const router = require("express").Router({mergeParams: true})
const methodNotAllowed = require("../utils/methodNotAllowed")
const reviewsCtl = require("./reviews.ctl")

router
    .route("/:reviewId")
    .put(reviewsCtl.update)
    .delete(reviewsCtl.delete)
    .all(methodNotAllowed)

module.exports = router
