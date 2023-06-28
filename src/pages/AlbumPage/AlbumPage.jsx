import React, { useEffect, useState } from 'react';
import { fetchAlbums } from '../../http/api';

import './AlbumPage.css';

const AlbumPage = () => {
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    fetchAlbums().then((album) => setAlbums(album));
  }, []);
  return (
    <div className="albums-container">
      {albums.map((album) => (
        <div className="album">
          <h3 className="album__title">{album.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default AlbumPage;
