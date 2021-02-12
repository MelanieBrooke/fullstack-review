import React from 'react';
import RepoFormat from './RepoFormat.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.count} repos.
    <table id="repolist">
      <tbody>
        <tr>
          <th>Repo Name</th>
          <th>Author Name</th>
          <th>Created/Modified</th>
          <th>Forks</th>
          <th>Watchers/Stargazers</th>
        </tr>
          {props.repos.map((repo)=> {
            return <RepoFormat repo={repo} key={repo.gitID}/>
          })}
      </tbody>
    </table>
  </div>
)

export default RepoList;