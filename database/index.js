const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
// const objectID = ObjectId();

let repoSchema = mongoose.Schema({
  // Is this the right way to make a unique ID? Unsure
  gitID: {type: Number, unqiue: true},
  user: String,
  userURL: String,
  // eventually refactor to use user from userSchema
  name: String,
  htmlURL: {type: String, unique: true},
  created: Date,
  modified: Date,
  pushed: Date,
  size: Number,
  openIssues: Number,
  forks: Number,
  watchers: Number,
  stargazers: Number
});

let userSchema = mongoose.Schema({
  username: {type: String, unique: true},
  userURL: {type: String, unique: true}
});


let Repo = mongoose.model('Repo', repoSchema);
let User = mongoose.model('User', userSchema);

let saveUser = (userObj) => {
  let user = new User({
    username: userObj.owner.login,
    userURL: userObj.owner.html_url
  })
  user.save()
  .then(result => {
    mongoose.connection.close();
  })
}


let save = (ghObj) => {
  let github = new Repo({
    gitID: ghObj.id,
    user: ghObj.owner.login,
    userURL: ghObj.owner.html_url,
    name: ghObj.name,
    htmlURL: ghObj.html_url,
    created: ghObj.created_at,
    modified: ghObj.updated_at,
    pushed: ghObj.pushed_at,
    size: ghObj.size,
    openIssues: ghObj.open_issues_count,
    forks: ghObj.forks_count,
    watchers: ghObj.watchers_count,
    stargazers: ghObj.stargazers_count
  })
  github.save()
  .then(result => {
    mongoose.connection.close();
  })
}

let access25 = () => {
  console.log('access25');
  mongoose.connect('mongodb://localhost/fetcher');
  var db = mongoose.connection;
  return Repo.find().sort({stargazers: -1}).limit(25);
}

let viewUsers = () => {
  console.log('viewUsers');
  mongoose.connect('mongodb://localhost/fetcher');
  var db = mongoose.connection;
  return User.find();
}


module.exports.save = save;
module.exports.access25 = access25;
module.exports.saveUser = saveUser;
module.exports.viewUsers = viewUsers;

