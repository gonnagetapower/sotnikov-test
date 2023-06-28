import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './PhotosPage.css';
import { Modal } from 'antd';
import { Photo } from '../../components';

const PhotosPage = () => {
  const params = useParams();
  const [photos, setPhotos] = useState([]);

  const [onePhoto, setOnePhoto] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/photos?albumId=${params.id}`)
      .then((photo) => {
        setPhotos(photo.data);
      });
  }, []);

  if (!photos) {
    return 'loading';
  }

  const fetchPhoto = (id) => {
    console.log(id);
    axios.get(`https://jsonplaceholder.typicode.com/photos?id=${id}`).then((onePhoto) => {
      setOnePhoto(onePhoto.data[0].url);
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="photos-page">
      {photos.map((photo, index) => (
        <img
          onClick={() => fetchPhoto(photo.id)}
          className="photo"
          src={photo.thumbnailUrl}
        />
      ))}
      <Modal width={'auto'} open={isModalOpen} onCancel={handleCancel}>
        <Photo url={onePhoto} />
      </Modal>
    </div>
  );
};

export default PhotosPage;
