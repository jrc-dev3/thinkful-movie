const moviesSvc = require("./movies.svc");
const tryCatchError = require("../utils/tryCatchError");

const validMovieId = (req, res, next) => {
  req.log.info("Checking if movieId was provided..");

  const { movieId } = req.params;

  req.log.debug(`movieId: ${movieId}`)

  if (movieId) {
    req.log.info("movieId present.")
    res.locals.movieId = movieId;
    return next();
  }

  next({
    status: 404,
    message: `Missing movieId Parameter: ${req.originalUrl}`,
  });
};

const movieExists = async (req, res, next) => {
  const methodName = "movieExists";
  const movieId = res.locals.movieId;

  req.log.info("Checking if movie exists..");
  req.log.debug(`Checking if movie ${movieId} exists..`);

  const data = await moviesSvc.read(movieId);

  req.log.trace({ __filename, methodName, return: true, data });

  if (data.movie_id){
    res.locals.movie = data;
    return next()
  } 

  next({
    status: 404,
    message: "Movie cannot be found.",
  });
};

const list = async (req, res) => {
  const methodName = "list";
  req.log.debug({ __filename, methodName });

  const { is_showing } = req.query;
  const data = await moviesSvc.list(is_showing);

  req.log.trace({ __filename, methodName, return: true, data });

  res.json({ data });
};

const read = async (req, res) => {
  const methodName = "read";
  req.log.debug({ __filename, methodName });

  const data = res.locals.movie;

  req.log.trace({ __filename, methodName, return: true, data });

  res.json({ data });
};
module.exports = {
  list: tryCatchError(list),
  read: [validMovieId, tryCatchError(movieExists), tryCatchError(read)],
  validMovieId,
  movieExists
};
