const reviewsSvc = require("./reviews.svc");
const moviesCtl = require('../movies/movies.ctl')
const tryCatchError = require("../utils/tryCatchError");
const res = require("express/lib/response");

const validReviewId = (req,res,next) => {
  const {reviewId} = req.params

  if(reviewId){
    res.locals.reviewId = reviewId
    return next()
  }

  next({
    status: 404,
    message: "Review cannot be found."
  })
}

const reviewExists = async (req,res,next) => {
  const reviewId = res.locals.reviewId
  const review = await reviewsSvc.read(reviewId)

  if(review && review.review_id){
    res.locals.review = review
    return next()
  }

  next({
    status: 404,
    message: "Review cannot be found."
  })

}

const validBody = (req,res,next) => {
  const {data = {}} = req.body

  if(data && (data.score || data.content)){
    res.locals.body = data
    return next()
  }

  next({
    status: 400,
    message: "Missing score/content."
  })
}

const read = async (req,res) => {
  const review = res.locals.review
  res.json({ data : review})

}

const list = async (req, res) => {
  const movieId  = res.locals.movieId
  const data = await reviewsSvc.list(movieId);
  res.json({ data });
};


const destory = async (req,res) => {
    const reviewId = res.locals.reviewId
    await reviewsSvc.delete(reviewId)
    res.sendStatus(204)
}

const update = async (req,res) => {
    const reviewId = res.locals.reviewId
    const body = res.locals.body
    const review = await reviewsSvc.read(reviewId)
    let updatedReview = {
      ...review,
      ...body
    }
    await reviewsSvc.update(updatedReview)
    updatedReview = await reviewsSvc.read(reviewId, true)

    res.json({data: updatedReview})
    
}
module.exports = {
  list: [moviesCtl.validMovieId, moviesCtl.movieExists, tryCatchError(list)],
  read: [validReviewId, reviewExists, tryCatchError(read)],
  delete: [validReviewId, tryCatchError(reviewExists),tryCatchError(destory)],
  update: [validReviewId, tryCatchError(reviewExists), validBody, tryCatchError(update)]
};
