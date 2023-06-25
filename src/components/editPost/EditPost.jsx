import React, { useState } from 'react';

import EditPage from '../editPage/EditPage';
import User from '../user/User';

import './EditPost.css';
import { Button, ConfigProvider } from 'antd';
import axios from 'axios';

const EditPost = ({ mode, setMode, user, title, body, postId }) => {
  const [editTitle, setEditTitle] = useState(title);
  const [editBody, setEditBody] = useState(body);

  const fetchNewValues = (editTitle, editBody) => {
    axios
      .patch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        title: editTitle,
        body: editBody,
      })
      .then((res) => {
        setMode('view');
      });
  };

  const discardChanges = () => {
    setEditTitle(title);
    setEditBody(body);
    setMode('view');
  };

  return (
    <>
      <EditPage setMode={setMode} mode={mode} />
      <div className="post__head">
        <User userId={user} />
        <textarea
          onChange={(e) => setEditTitle(e.target.value)}
          type="text"
          className="post__title input"
          value={editTitle}
        />
      </div>
      <textarea
        onChange={(e) => setEditBody(e.target.value)}
        className="post__descr input input--body"
        value={editBody}
      />

      {editTitle !== title || editBody !== body ? (
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: '#355c7d',
                colorTextLightSolid: '#fff',
                colorPrimaryHover: '#477aa6',
              },
            },
          }}>
          <Button
            onClick={() => fetchNewValues(editTitle, editBody)}
            type="primary"
            style={{ marginRight: '5px' }}>
            Save changes
          </Button>
          <Button onClick={() => discardChanges()} danger type="primary">
            Discard changes
          </Button>
        </ConfigProvider>
      ) : (
        <></>
      )}
    </>
  );
};

export default EditPost;
