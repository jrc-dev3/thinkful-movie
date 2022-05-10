const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties")
const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  is_showing: ["movies", null, "is_showing"],
});

function list(movieId) {

return knex("theaters as t")
        .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
        .select("*")
        .where({ movie_id: movieId, is_showing: true})

}

const listAll = () => {
  return knex("movies as m")
          .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
          .join("theaters as t", "mt.theater_id" ,"t.theater_id")
          .select("m.*","t.*","mt.is_showing")
          .then(res => reduceMovies(res))


  // return knex("theaters as t")
  //         .join("movies_theaters as mt", "mt.theater_id", "mt.movie_id")
  //         .join("movies as m", "m.movie_id", "mt.movie_id")
  //         .select("*")
          // .orderBy("t.theater_id")
          // .then(res => reduceMovies(res))
}

module.exports = {
  list,
  listAll
};
