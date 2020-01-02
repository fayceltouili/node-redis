// Cache middleware
const redis = require('redis');
const { REDIS_PORT } = require("../config");

const client = redis.createClient(REDIS_PORT);

// Set response
const setResponse = (username, repos) => 
  `<h2>${username} has ${repos} Github repos</h2>`;


// get data from Redis
const getData = (req, res, next) => {
  const { username } = req.params;

  client.get(username, (err, data) => {
    if (err) throw err;
    data ? res.send(setResponse(username, data)): next();
  });
}

// Set data to Redis
const setData = (key, data) => 
  client.setex(key, 3600, data);


module.exports = {
  getData,
  setData
}

