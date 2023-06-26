import React, { useEffect, useState } from 'react';
import { Post } from '../components';
import axios from 'axios';

import { DownOutlined, UpOutlined } from '@ant-design/icons';

import { ReactComponent as Filter } from './../assets/svg/filter.svg';

import './PostPage.css';
import { ConfigProvider, Dropdown, Input, Pagination, Space } from 'antd';

const { Search } = Input;

const items = [
  {
    label: 'Sort by userId',
    key: 'userId',
  },
  {
    label: 'Sort by postId',
    key: 'id',
  },
];

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

  const [pinnedPost, setPinnedPost] = useState([]);

  const [storageItem, setStorageItem] = useState(() =>
    JSON.parse(localStorage.getItem('favourites') || '[]'),
  );

  const [hideFilters, setHideFilters] = useState(true);
  const [filterOrder, setFilterOrder] = useState({
    title: '',
    active: false,
  });

  const [filterValue, setFilterValue] = useState('');

  const handleCount = (index) => {
    setActiveCount(index);
    setPageSize(counstValues[index]);
    setPage(1);
    localStorage.setItem('activeCount', index);
  };

  const deletePost = (postId) => {
    const newPosts = posts.filter((el) => el.id !== postId);
    setPosts(newPosts);
  };

  const deletePinned = () => {
    let newPosts = posts;
    for (let i = 0; i < pinnedPost.length; i++) {
      newPosts = newPosts.filter((el) => el.id !== pinnedPost[i]);
    }
    setPosts(newPosts);
  };

  const addToFavoritedPinned = () => {
    for (let i = 0; i < pinnedPost.length; i++) {
      let isFavourited = storageItem.includes(pinnedPost[i]);
      console.log(isFavourited);
      if (!isFavourited) {
        const newStorageItem = [...storageItem, ...pinnedPost];
        setStorageItem(newStorageItem);
        localStorage.setItem('favourites', JSON.stringify(newStorageItem));
      } else {
        const newStorageItem = storageItem.filter((savedId) => savedId !== pinnedPost[i]);
        console.log(newStorageItem);
        setStorageItem(newStorageItem);
        localStorage.setItem('favourites', JSON.stringify(newStorageItem));
      }
    }
  };

  const sortBy = (type) => {
    let sorted = [...posts].sort((a, b) => (a[type] < b[type] ? 1 : -1));
    if (sorted[0][type] === posts[0][type]) {
      sorted = [...posts].sort((a, b) => (a[type] < b[type] ? -1 : 1));
    }
    if (sorted[0][type] > sorted[sorted.length - 1][type]) {
      setActiveFilter(`By ${type} desc`);
    } else {
      setActiveFilter(`By ${type} asc`);
    }
    setPosts(sorted);
    console.log(sorted);
  };

  const [sortByFav, setSortByFav] = useState(false);

  const sortByFavorite = () => {
    console.log(storageItem);
    const sorted = [...posts].sort((b, a) =>
      !sortByFav
        ? storageItem.indexOf(a.id) - storageItem.indexOf(b.id)
        : storageItem.indexOf(b.id) - storageItem.indexOf(a.id),
    );
    setSortByFav(!sortByFav);
    console.log(sortByFav);
    setPosts(sorted);
  };

  const [activeFilter, setActiveFilter] = useState('By user');

  const onClick = ({ key }) => {
    sortBy(key);
  };

  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?title_like=${filterValue}&_start=0&_limit=${pageSize}&_page=${page}`,
      )
      .then((post) => {
        setPosts(post.data);
      });
  }, [activeCount, page, pageSize, filterValue]);

  const onSearch = (value) => setFilterValue(value);

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
            <div onClick={() => setHideFilters(!hideFilters)} className="filter-icon">
              <Filter />
            </div>
          </div>
          <div className={!hideFilters ? 'filter' : 'filter--hide'}>
            <h3 className="filter__item">
              <Search onSearch={onSearch} placeholder="search by title" />
              {/* {filterOrder.title !== 'title' ? (
                <DownOutlined
                  onClick={() => setFilterOrder({ title: 'title', active: 'true' })}
                />
              ) : (
                <UpOutlined onClick={() => setFilterOrder({})} />
              )} */}
            </h3>
            <Dropdown
              className="filter-list"
              menu={{ items, onClick }}
              trigger={['click']}>
              <div>
                {activeFilter}
                <DownOutlined />
              </div>
            </Dropdown>
            <h3 className="filter__item" onClick={sortByFavorite}>
              By user favorite
              {!sortByFav ? <DownOutlined /> : <UpOutlined />}
            </h3>
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
              deletePost={deletePost}
              key={post.id}
              postId={post.id}
              title={post.title}
              body={post.body}
              user={post.userId}
              pinnedPost={pinnedPost}
              setPinnedPost={setPinnedPost}
              deletePinned={deletePinned}
              storageItem={storageItem}
              setStorageItem={setStorageItem}
              addToFavoritedPinned={addToFavoritedPinned}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PostPage;
