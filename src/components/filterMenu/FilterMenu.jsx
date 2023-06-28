import React from 'react';
import { Dropdown, Input } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import './FilterMenu.css';

const { Search } = Input;

const FilterMenu = ({
  hideFilters,
  onSearch,
  items,
  onClick,
  activeFilter,
  sortByFavorite,
  sortByFav,
}) => {
  return (
    <div className={!hideFilters ? 'filter' : 'filter--hide'}>
      <h3 className="filter__item">
        <Search onSearch={onSearch} placeholder="search by title" />
      </h3>
      <Dropdown className="filter-list" menu={{ items, onClick }} trigger={['click']}>
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
  );
};

export default FilterMenu;
