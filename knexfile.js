const path = require("path");

require("dotenv").config();

const {
  DATABASE_URL = "postgresql://postgres@localhost/postgres",
  DATABASE_USER= "dummyuser",
  DATABASE_PW = "dummypw"
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host : DATABASE_URL,
      port : 5432,
      user : DATABASE_USER,
      password : DATABASE_PW,
      database : DATABASE_USER
    },
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: {
      host : DATABASE_URL,
      port : 5432,
      user : DATABASE_USER,
      password : DATABASE_PW,
      database : DATABASE_USER
    },
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};
