import React, { useState } from 'react';
import { Breadcrumb, ConfigProvider, Menu } from 'antd';

import './Header.css';
import { Link } from 'react-router-dom';

const items = [
  {
    label: (
      <Link to="/" rel="noopener noreferrer">
        Posts
      </Link>
    ),
    key: 'posts',
  },
  {
    label: (
      <Link to="/album" rel="noopener noreferrer">
        Photos
      </Link>
    ),
    key: 'photos',
  },
  {
    label: (
      <Link to="/task" rel="noopener noreferrer">
        Tasks
      </Link>
    ),
    key: 'tasks',
  },
];

const Header = () => {
  const [currentPage, setCurrentPage] = useState('posts');
  const handlePage = (e) => {
    setCurrentPage(e.key);
  };
  return (
    <header className="header">
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              colorPrimary: '#355c7d',
            },
          },
        }}>
        {/* <Breadcrumb
          className="breadcrumbs"
          items={[
            {
              title: <a href="">Посты</a>,
              path: '/',
            },
            {
              title: <a>Фото</a>,
            },
            {
              title: <a>Задачи</a>,
            },
          ]}
        /> */}
        <Menu
          selectedKeys={[currentPage]}
          onClick={handlePage}
          className="header-menu"
          items={items}
          mode="horizontal"
        />
      </ConfigProvider>
    </header>
  );
};

export default Header;
