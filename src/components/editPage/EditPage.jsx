import React from 'react';
import { ReactComponent as PenMonoolor } from './../../assets/svg/pencilMonocolor.svg';
import { ReactComponent as PenColorIcon } from './../../assets/svg/pencilColor.svg';

import './EditPage.css';

const EditPage = ({ mode, setMode }) => {
  return (
    <div className="edit-wrapper">
      {mode === 'view' ? (
        <div className="edit" onClick={() => setMode('edit')}>
          <PenMonoolor />
        </div>
      ) : (
        <div className="view" onClick={() => setMode('view')}>
          <PenColorIcon />
        </div>
      )}
    </div>
  );
};

export default EditPage;
