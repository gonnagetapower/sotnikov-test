import React, { useState } from 'react';
import { ReactComponent as Heart } from './../../assets/svg/heart.svg';

import './Favorite.css';

const Favorite = ({ postId, storageItem, setStorageItem }) => {
  const isFavourited = storageItem.includes(postId);

  const handleToggleFavourite = () => {
    if (!isFavourited) {
      const newStorageItem = [...storageItem, postId];
      setStorageItem(newStorageItem);
      localStorage.setItem('favourites', JSON.stringify(newStorageItem));
    } else {
      const newStorageItem = storageItem.filter((savedId) => savedId !== postId);
      setStorageItem(newStorageItem);
      localStorage.setItem('favourites', JSON.stringify(newStorageItem));
    }
  };
  return (
    <div className="favorite">
      <Heart onClick={handleToggleFavourite} fill={isFavourited ? '#f5222d' : ''} />
    </div>
  );
};

export default Favorite;
