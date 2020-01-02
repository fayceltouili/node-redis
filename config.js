/** Shared config for application; can be required in many places. */

const PORT = +process.env.PORT || 5000;
const REDIS_PORT = +process.env.REDIS_PORT || 6379;

module.exports ={
  PORT,
  REDIS_PORT
};

