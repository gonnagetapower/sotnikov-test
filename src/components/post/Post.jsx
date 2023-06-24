import React from 'react';

import './Post.css';

const Post = ({ title, body }) => {
  return (
    <div className="post">
      <h2 className="post__title">{title}</h2>
      <p className="post__descr">{body}</p>
    </div>
  );
};

export default Post;
