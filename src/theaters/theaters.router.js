const router = require("express").Router({mergeParams: true})
const notAllowed = require("../utils/notAllowed")
const theatersCtl = require("./theaters.ctl")

router
    .route("/")
    .get(theatersCtl.listAll)
    .all(notAllowed)


module.exports = router
