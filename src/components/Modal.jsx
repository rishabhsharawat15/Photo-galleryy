
import React from 'react';

function Modal(props) {
  if (!props.showModal) {
    return null;
  }

  return (
    <div className="modal" onClick={props.closeModal}>
      <div className="modal-content">
        <span className="close" onClick={props.closeModal}>&times;</span>
        <img src={`https://live.staticflickr.com/${props.photo.server}/${props.photo.id}_${props.photo.secret}.jpg`} alt={props.photo.title} />
      </div>
    </div>
  );
}

export default Modal;
