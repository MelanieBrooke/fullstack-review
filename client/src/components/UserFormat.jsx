import React from 'react';

var UserFormat = (props) => {
  return (
    <tr>
      {/* <td>{props.user.username}</td> */}
      <td><a href={props.user.userURL} title="Go to user's page">{props.user.username}</a></td>
    </tr>
  )
};

export default UserFormat;