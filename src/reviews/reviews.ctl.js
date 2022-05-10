const reviewsSvc = require("./reviews.svc");
const moviesCtl = require('../movies/movies.ctl')
const tryCatchError = require("../utils/tryCatchError");

const list = async (req, res) => {
  const movieId  = res.locals.movieId
  const data = await reviewsSvc.list(movieId);
  res.json({ data });
};


const destory = async (req,res) => {
    const reviewId = res.locals.reviewId
    const data = await reviewsSvc.delete(reviewId)
    res.sendStatus(204)

    // res.json({data})
}

const update = async () => {
    return []
}
module.exports = {
  list: [moviesCtl.validMovieId, moviesCtl.movieExists, tryCatchError(list)],
  delete: tryCatchError(destory),
  update: tryCatchError(update)
};
