const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  var githubURL = `https://api.github.com/users/${username}/repos`;
  let options = {
    url: githubURL,
    headers: {
      'User-Agent': 'request',
      // 'Authorization': `token ${config.TOKEN}`
      'Authorization': `token ${process.env.GITHUB_TOKEN}`
    }
  };
  return axios.get(githubURL, options);

}

module.exports.getReposByUsername = getReposByUsername;