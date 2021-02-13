const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let githubRepos = require('../helpers/github.js')
let database = require('../database/index.js');
let mongoose = require('mongoose');
require("dotenv").config();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/repos', function (req, res) {
  console.log('post request successful');
  var username = req.body.term;
  githubRepos.getReposByUsername(username)
    .then((data) => {
      for (var i = 0; i < data.data.length; i++) {
        database.save(data.data[i]);
        console.log('done.')
      }
      res.end();
    })
    .catch((err) => {
      res.send(err);
    })
});

app.get('/repos', function (req, res) {
  console.log('get request successful');
  database.access25()
  .then(data => {res.end(JSON.stringify(data))})
});

app.post('/users', function (req, res) {
  console.log('user post request successful');
  var username = req.body.term;
  githubRepos.getReposByUsername(username)
    .then((data) => {
      for (var i = 0; i < data.data.length; i++) {
        database.saveUser(data.data[i]);
        console.log('user saved.')
      }
      res.end();
    })
    .catch((err) => {
      res.send(err);
    })
});

app.get('/users', function (req, res) {
  console.log('user get request successful');
  database.viewUsers()
  .then(data => {res.end(JSON.stringify(data))})
});



let port = process.env.PORT;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});