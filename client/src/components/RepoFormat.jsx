import React from 'react';

var RepoFormat = (props) => {
  return (
    <tr>
      <td><a href={props.repo.htmlURL} title="Go to repo">{props.repo.name}</a></td>
      <td><a href={props.repo.userURL} title="Go to author page">{props.repo.user}</a></td>
      <td>{props.repo.created}<br/><br/>{props.repo.modified}</td>
      <td>{props.repo.forks}</td>
      <td>Watchers: {props.repo.watchers}<br/>
      Stargazers: {props.repo.stargazers}</td>
    </tr>
  )
};

export default RepoFormat;