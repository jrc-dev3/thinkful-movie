const knex = require("../db/connection");

function list(movieId) {

return knex("theaters as t")
        .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
        .select("*")
        .where({ movie_id: movieId})

}

module.exports = {
  list,
};
