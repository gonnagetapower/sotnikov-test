import React from 'react';

import './Comment.css';

const Comment = ({ name, email, body }) => {
  return (
    <article className="comment">
      <h3 className="comment__author">{name}</h3>
      <a href={`mailto: ${email}`} className="comment__email">
        {email}
      </a>
      <p className="comment__text">{body}</p>
    </article>
  );
};

export default Comment;
