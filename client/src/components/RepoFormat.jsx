import React from 'react';

var RepoFormat = (props) => {
  return (
    <tr>
      <td>{props.repo.name}</td>
      <td>{props.repo.user}</td>
      <td>{props.repo.htmlURL}</td>
      <td>{props.repo.created}<br/><br/>{props.repo.modified}</td>
      {/* <td>{props.repo.modified}</td> */}
      <td>{props.repo.forks}</td>
      <td>Watchers: {props.repo.watchers}<br/>
      Stargazers: {props.repo.stargazers}</td>
      {/* <td>{props.repo.stargazers}</td> */}
    </tr>
  )
};

export default RepoFormat;


{/* <th>| Repo Name | </th>
<th>Author Name | </th>
<th>Link | </th>
<th>Created | </th>
<th>Modified | </th>
<th>Forks | </th>
<th>Watchers | </th>
<th>Stargazers | </th> */}