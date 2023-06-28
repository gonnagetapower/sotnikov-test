import React from 'react';

const Photo = ({ url }) => {
  if (!url) {
    return 'loading';
  }

  return (
    <div>
      <img src={url} />
    </div>
  );
};

export default Photo;
