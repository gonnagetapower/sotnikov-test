import React, { useState } from 'react';

import './Post.css';
import { Comment, EditPage, User } from '../index';
import { Button, ConfigProvider } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import axios from 'axios';
import EditPost from '../editPost/EditPost';

const Post = ({ title, body, user, postId }) => {
  const [activeBtn, setActiveBtn] = useState(false);
  const [comments, setComments] = useState([]);

  const [mode, setMode] = useState('view');

  const onShowComments = () => {
    setActiveBtn(!activeBtn);
    if (!activeBtn) {
      axios
        .get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then((com) => {
          setComments(com.data);
        });
    }
  };

  return (
    <div className="post">
      {mode === 'view' ? (
        <>
          <EditPage setMode={setMode} mode={mode} />
          <div className="post__head">
            <User userId={user} />
            <h2 className="post__title">{title}</h2>
          </div>
          <p className="post__descr">{body}</p>
          <div className="btn-wrapper">
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: '#ffc6a5',
                    colorTextLightSolid: '#000',
                    colorPrimaryHover: '#355c7d',
                  },
                },
              }}>
              <Button
                onClick={() => onShowComments()}
                type={activeBtn ? 'primary' : 'text'}>
                Comments
                {activeBtn ? <UpOutlined /> : <DownOutlined />}
              </Button>
            </ConfigProvider>
          </div>
          {activeBtn ? (
            <div className="comments">
              {comments.map((com) => (
                <ul key={com.id} className="comments-list list-reset">
                  <li className="comments__item">
                    <Comment name={com.name} email={com.email} body={com.body} />
                  </li>
                </ul>
              ))}
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <EditPost
          mode={mode}
          setMode={setMode}
          title={title}
          body={body}
          user={user}
          postId={postId}
        />
      )}
    </div>
  );
};

export default Post;
