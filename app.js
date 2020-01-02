const express = require('express');
const fetch = require('node-fetch');
const { getData, setData } = require("./middleware/cacheData");



const app = express();

// Set response
const setResponse = (username, repos) => 
   `<h2>${username} has ${repos} Github repos</h2>`;



// Make request to Github for data
const getRepos = async (req, res, next) => {

  try {
    const { username } = req.params;

    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    const repos = data.public_repos;

     // Set data to Redis
    setData (username, repos);
    res.send(setResponse(username, repos));

  } catch (err) {
    console.error(err);
    res.status(500);
  }
}

app.get('/repos/:username', getData, getRepos);



/** general error handler */

app.use( (err, req, res, next) => {
  res.status(err.status || 500);
  console.error(err.stack);

  return res.json({
    status: err.status,
    message: err.message
  });
});

module.exports = app;
