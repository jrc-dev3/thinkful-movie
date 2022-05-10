const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const addCriticCategory = mapProperties({
  critic_id: "critic.critic_id",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

const list = (movieId) => {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ movie_id: movieId })
    .then((res) => res.map((review) => addCriticCategory(review)));
};

const destroy = (reviewId) => {
  return knex("reviews").where({ review_id: reviewId }).del();
};

const update = (reviewId) => {
  return [];
};

module.exports = {
  list,
  update,
  delete: destroy,
};
