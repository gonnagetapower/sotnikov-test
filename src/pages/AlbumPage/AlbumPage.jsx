import React, { useEffect, useState } from 'react';
import { fetchAlbums } from '../../http/api';

import './AlbumPage.css';
import { ConfigProvider, Pagination } from 'antd';
import { Count } from '../../components';

const AlbumPage = () => {
  const counstValues = [10, 20, 50, 100];
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
    fetchAlbums().then((album) => setAlbums(album));
  }, []);

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
            <div className="album">
              <h3 className="album__title">{album.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
