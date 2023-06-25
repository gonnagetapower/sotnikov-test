import React, { useEffect, useState } from 'react';
import { Post } from '../components';
import axios from 'axios';

import './PostPage.css';
import { ConfigProvider, Pagination } from 'antd';

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const counstValues = [10, 20, 50, 100];
  const [activeCount, setActiveCount] = useState(
    localStorage.getItem('activeCount') !== null
      ? localStorage.getItem('activeCount')
      : 0,
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(counstValues[activeCount]);

  const handleCount = (index) => {
    setActiveCount(index);
    setPageSize(counstValues[index]);
    setPage(1);
    localStorage.setItem('activeCount', index);
  };

  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=${pageSize}&_page=${page}`,
      )
      .then((post) => {
        setPosts(post.data);
      });
  }, [activeCount, page, pageSize]);

  return (
    <div className="post-page">
      <h1 className="post-page__title">Лента постов</h1>
      <section className="posts">
        <div className="post-container">
          <div className="post-count">
            <h2 className="post-count__title">Количество записей:</h2>
            <ul className="list-reset post-count__list">
              {counstValues.map((value, index) => (
                <li
                  key={index}
                  onClick={() => handleCount(index)}
                  className={
                    activeCount == index
                      ? 'post-count__item post-count__item--active'
                      : 'post-count__item'
                  }>
                  {value}
                </li>
              ))}
            </ul>
          </div>
          <div className="pagination">
            <ConfigProvider
              theme={{
                components: {
                  Pagination: {
                    colorPrimary: '#FA7E61',
                    colorPrimaryHover: '#FD613E',
                  },
                },
              }}>
              <Pagination
                responsive={true}
                simple
                current={page}
                onChange={(page) => setPage(page)}
                total={100}
                pageSize={pageSize}
              />
            </ConfigProvider>
          </div>
          {posts.map((post) => (
            <Post
              key={post.id}
              postId={post.id}
              title={post.title}
              body={post.body}
              user={post.userId}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PostPage;
