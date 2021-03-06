const pinoHttp = require("pino-http");
const { nanoid } = require("nanoid");

require("dotenv").config();
const level = process.env.LOG_LEVEL || "silent";
const nodeEnv = process.env.NODE_ENV || "development";
const prettyPrint = nodeEnv === "development";

const logger = pinoHttp({
  genReqId: (request) => request.headers["x-request-id"] || nanoid(),
  level,
  prettyPrint,
});

module.exports = logger;
