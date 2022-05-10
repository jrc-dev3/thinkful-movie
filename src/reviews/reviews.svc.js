const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const addCriticCategory = mapProperties({
  critic_id: "critic.critic_id",
  critic_created_at: "critic.created_at",
  critic_updated_at: "critic.updated_at",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});
const addCriticCategory_read = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

const read = (reviewId, withCritic = false) => {
  if (withCritic) {
    return knex("reviews as r")
      .join("critics as c", "r.critic_id", "c.critic_id")
      .select("r.*", "c.preferred_name", "c.surname", "c.organization_name")
      .where({ review_id: reviewId })
      .then((res) => res.map((review) => addCriticCategory_read(review)))
      .then((res) => res[0]);
  }
  return knex("reviews as r")
    .select("*")
    .where({ review_id: reviewId })
    .first();
};

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

const update = (updatedBody) => {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedBody.review_id })
    .update(updatedBody, "*");
};

module.exports = {
  list,
  read,
  update,
  delete: destroy,
};
