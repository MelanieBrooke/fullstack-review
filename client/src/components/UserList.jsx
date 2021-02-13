import React from 'react';
import UserFormat from './UserFormat.jsx';

const UserList = (props) => (
  <div>
    <h4> Users in Database </h4>
    You are viewing info for {props.count} different users.
    <table id="userlist">
      <tbody>
        <tr>
          <th>Github Handle</th>
        </tr>
          {props.users.map((user)=> {
            return <UserFormat user={user} key={user.gitID}/>
          })}
      </tbody>
    </table>
  </div>
);

export default UserList;