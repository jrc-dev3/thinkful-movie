const notAllowed = (req,res,next) => {
    next({
        status: 405,
        message: `${req.method}`
    })
}

module.exports = notAllowed