import React, { useEffect, useState } from 'react';

import './User.css';
import axios from 'axios';

const User = ({ userId }) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users?id=${userId}`).then((user) => {
      setUser(user.data);
    });
  }, []);

  if (!user) {
    return 'loading';
  }

  return (
    <div className="user">
      <div className="user__photo">
        <img></img>
      </div>
      <div className="user__info">
        <h3 className="user__name">{user[0].name}</h3>
        <h4 className="user__userName">@{user[0].username}</h4>
      </div>
    </div>
  );
};

export default User;
