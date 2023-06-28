import React, { useEffect, useState } from 'react';
import { fetchAlbums } from '../../http/api';

import './AlbumPage.css';
import { ConfigProvider, Pagination } from 'antd';
import { Count, FilterMenu } from '../../components';
import { Link } from 'react-router-dom';

const counstValues = [10, 20, 50, 100];

const AlbumPage = () => {
  const [activeCount, setActiveCount] = useState(
    localStorage.getItem('activeCount') !== null
      ? localStorage.getItem('activeCount')
      : 0,
  );
  const handleCount = (index) => {
    setActiveCount(index);
    setPageSize(counstValues[index]);
    setPage(1);
    localStorage.setItem('activeCount', index);
  };
  const [hideFilters, setHideFilters] = useState(true);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(counstValues[activeCount]);

  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    fetchAlbums('', pageSize, page).then((album) => setAlbums(album));
  }, [pageSize, page]);

  return (
    <div className="album-page">
      <div className="album-container">
        <Count
          counstValues={counstValues}
          handleCount={handleCount}
          activeCount={activeCount}
          setHideFilters={setHideFilters}
          hideFilters={hideFilters}
        />
        {/* <FilterMenu
          hideFilters={hideFilters}
          onSearch={onSearch}
          onClick={onClick}
          items={items}
          activeFilter={activeFilter}
          sortByFavorite={sortByFavorite}
          sortByFav={sortByFav}
        /> */}
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
        <div className="albums-grid">
          {albums.map((album) => (
            <Link key={album.id} to={`/album/${album.id}`}>
              <div className="album">
                <h3 className="album__title">{album.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
