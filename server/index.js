const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let githubRepos = require('../helpers/github.js')
let database = require('../database/index.js');
let mongoose = require('mongoose');

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
  // res.end();
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  console.log('get request successful');
  access25();

  res.end();
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


let access25 = () => {
  console.log('access25');
  mongoose.connect('mongodb://localhost/fetcher');
  var db = mongoose.connection;
  // console.log(db);
  // console.log(db.collections.repos)
  db.collections.repos.find();
  // dbo = db.db('fetcher');
  console.log('made it this far')
  // db.Repo.find()
  // db.find();
  // .toArray(function(err, result) {
  //   if (err) {
  //     throw err;
  //   } else {
  //     console.log(result);
  //     db.close();
  //   }
}