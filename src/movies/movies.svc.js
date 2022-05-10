const knex = require("../db/connection");

const list = (isShowing = false) => {
  if (isShowing){
    return knex("movies as m")
            .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
            .select(
              "m.movie_id as id",
              "m.title",
              "m.runtime_in_minutes",
              "m.rating",
              "m.description",
              "m.image_url"
              )
            .distinct()
            .orderBy("id")
            .where({ is_showing: true });
    
  } 

  return knex("movies as m")
          .select(
            "m.movie_id as id",
            "m.title",
            "m.runtime_in_minutes",
            "m.rating",
            "m.description",
            "m.image_url"
            )
};

const read = movieId => {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
};

module.exports = {
  list,
  read,
};
