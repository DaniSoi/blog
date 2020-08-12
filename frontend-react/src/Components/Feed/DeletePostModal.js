import React from "react";
import Modal from "./Modal";

export const DeletePostModal = ({isHidden, onDelete, onClose}) => {
  return (
    <Modal isHidden={isHidden}
           onClose={onClose}
           innerContainerClass="delete-post-modal__inner-container"
    >
      <h4 className="delete-post-modal__title">
        Are you sure you want to delete the post?
      </h4>
      <hr/>
      <div className="delete-post-modal__options">
        <button className="btn" onClick={onDelete}>Yes</button>
        <button className="btn" onClick={onClose}>No</button>
      </div>
      </Modal>
  );
};
