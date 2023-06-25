import React, { useState } from 'react';

import './Post.css';
import { Comment, EditPage, Favorite, User } from '../index';
import { Button, Checkbox, ConfigProvider, Modal } from 'antd';
import { DownOutlined, UpOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import axios from 'axios';
import EditPost from '../editPost/EditPost';

const Post = ({
  title,
  body,
  user,
  postId,
  deletePost,
  pinnedPost,
  setPinnedPost,
  deletePinned,
  storageItem,
  setStorageItem,
  addToFavoritedPinned,
}) => {
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

  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: 'Are you sure delete this post?',
      icon: <ExclamationCircleFilled />,
      content: 'This action is irreversible.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deletePost(postId);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const showDeletePinnedConfirm = () => {
    confirm({
      title: 'Are you sure delete pinned posts?',
      icon: <ExclamationCircleFilled />,
      content: 'This action is irreversible.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deletePinned();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const [checked, setChecked] = useState(false);
  let filterArray = [];
  const handleCheckox = (e, index) => {
    setChecked(!checked);
    if (checked) {
      filterArray = pinnedPost.filter((number) => number !== index);
      setPinnedPost([...filterArray]);
    } else {
      setPinnedPost([...pinnedPost, index]);
      pinnedPost.push(index);
    }
  };

  // const addPinnedToFavorite = () => {
  //   console.log(localStorage.getItem('favourites'));
  // };

  return (
    <div className="post">
      {mode === 'view' ? (
        <>
          <EditPage setMode={setMode} mode={mode} />
          <div className="post__head">
            <Favorite
              postId={postId}
              storageItem={storageItem}
              setStorageItem={setStorageItem}
            />
            <User userId={user} />
            <h2 className="post__title">{title}</h2>
          </div>
          <Checkbox
            onChange={(e) => handleCheckox(e, postId)}
            checked={checked}
            className="checkbox"
          />
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
              <Button type="primary" danger onClick={showConfirm}>
                Delete post
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
      {checked ? (
        <div className="post-option">
          <Button onClick={showDeletePinnedConfirm}>Delete</Button>
          <Button onClick={addToFavoritedPinned}>Add to favorite</Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Post;
