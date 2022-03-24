import React from 'react';

const UserLayout =(props) => (
<div>
  <ul>
    <li>
      <a href="/user/add">add user</a>
    </li>
    <li>
      <a href="/user/list">user list</a>
    </li>
  </ul>
  {props.children}
</div>
) 

export default UserLayout;