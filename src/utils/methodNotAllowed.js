const methodNotAllowed = (req,res,next) => {
    next({
        status: 405,
        message: `${req.method}`
    })
}

module.exports = methodNotAllowed