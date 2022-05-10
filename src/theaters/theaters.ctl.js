const moviesCtl = require("../movies/movies.ctl");
const theatersSvc = require("../theaters/theaters.svc");
const tryCatchError = require("../utils/tryCatchError");

const list = async (req, res) => {
  const movieId  = res.locals.movieId
  const data = await theatersSvc.list(movieId);
  res.json({ data });
};

const listAll = async (req,res) => {
  const data = await theatersSvc.listAll()
  res.json({data})
}

const destory = async (req,res) => {
    const reviewId = res.locals.reviewId
    const data = await theatersSvc.delete(reviewId)
    res.sendStatus(204)

    // res.json({data})
}
module.exports = {
  list: [moviesCtl.validMovieId, moviesCtl.movieExists, tryCatchError(list)],
  listAll: [tryCatchError(listAll)],
  delete: tryCatchError(destory)
};
