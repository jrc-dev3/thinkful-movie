const router = require("express").Router({mergeParams: true})
const methodNotAllowed = require("../utils/methodNotAllowed")
const theatersCtl = require("./theaters.ctl")

router
    .route("/")
    .get(theatersCtl.listAll)
    .all(methodNotAllowed)


module.exports = router
