import React from 'react';
import { Breadcrumb, ConfigProvider } from 'antd';

import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <ConfigProvider
        theme={{
          components: {
            Breadcrumb: {
              colorText: 'rgba(0, 0, 0, 0.18)',
              colorTextDescription: '#fff',
              lineHeight: '2.5',
              colorBgTextHover: 'none',
              colorText: '#ffd591',
            },
          },
        }}>
        <Breadcrumb
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
        />
      </ConfigProvider>
    </header>
  );
};

export default Header;
