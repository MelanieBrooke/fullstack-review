import React from 'react';

var RepoFormat = (props) => {
  return (
    <tr>
      <td>{props.repo.name}</td>
      <td>{props.repo.user}</td>
    </tr>
  )
};

export default RepoFormat;