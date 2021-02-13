import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import UserList from './components/UserList.jsx';
// require("dotenv").config();



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      reposCount: 0,
      users: [],
      usersCount: 0
    }
  }

  componentDidMount() {
  this.getAndDisplayRepos();
  this.getAndDisplayUsers();
  // this.userDisplay();
  }

  search (term) {
    console.log(`${term} was searched`);
    // console.log(process.env.REACT_APP_PORT);
    $.ajax({
      type: "POST",
      // url:`http://localhost:${process.env.PORT}/repos`,
      url:`http://localhost:8626/repos`,
      data: JSON.stringify({term}),
      contentType: 'application/json',
      success:()=>{
        console.log('success');
        this.getAndDisplayRepos();
      }
    })
    $.ajax({
      type: "POST",
      url: `http://localhost:8626/users`,
      data: JSON.stringify({term}),
      contentType: 'application/json',
      success:()=>{
        console.log('user post request!')
      }
    })
  }

  getAndDisplayRepos () {
    $.ajax({
      type: "GET",
      // url: `http://localhost:${process.env.PORT}/repos`,
      url: `http://localhost:8626/repos`,
      success:(data)=>{
        let repos = JSON.parse(data);
        this.setState({
          repos: repos,
          reposCount: repos.length
        })
      }
    })
  }

  getAndDisplayUsers() {
    $.ajax({
      type: "GET",
      // url: `http://localhost:${process.env.PORT}/repos`,
      url: `http://localhost:8626/repos`,
      success:(data)=>{
        data = JSON.parse(data);
        var users = [];
        var usernames = new Set();
        for (var i = 0; i < data.length; i++) {
          if (!usernames.has(data[i].user)) {
            usernames.add(data[i].user);
            var userInfo = {
            'username':data[i].user,
            'userURL':data[i].userURL
          };
          users.push(userInfo);
          }
        }
        this.setState({
          users:users,
          userCount:users.length
        })
      }
    })
  }

  userDisplay ()  {
    // console.log('userDisplay')
    var userSet = new Set();
    // console.log(this.state.repos.length)
    for (var j = 0; j < this.state.repos.length; j++) {
      // console.log(this.state.repos[j].user);
      userSet.add(this.state.repos[j].user);
    }
    // console.log(userSet);
    var userArray = Array.from(userSet);
    // console.log(userArray);
    this.setState({
      users: userArray,
      userCount: userArray.length
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <UserList users={this.state.users} count={this.state.userCount}/>
      <RepoList repos={this.state.repos} count={this.state.reposCount}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));