import React from "react";
import Modal from "./Modal";
import { Form } from "../Common/Form";
import { FormModalHeader } from "./FormModalHeader";

export const WritePostModal = ({
                                 isHidden,
                                 modalHeader,
                                 formProps,
                                 onClose,
                                 disableBtn
                               }) => {
  const { fileInputRef, ...restFormProps } = formProps;
  const inputFields = [
    {
      placeholder: 'Enter a title..',
      type: 'text',
      name: 'postTitleInput',
      containerClass: 'labeled-input',
      title: 'Title'
    },
    {
      placeholder: `What's on your mind?`,
      type: 'textarea',
      name: 'postBodyInput',
      containerClass: 'labeled-input',
      title: 'Body'
    },
    {
      type: 'file',
      name: 'postImg',
      ref: fileInputRef,
      containerClass: 'labeled-input',
      title: 'Image'
    }
  ];

  return (
    <Modal isHidden={isHidden}
           outerContainerClass='form-modal'
           innerContainerClass="form-modal__inner-container"
           onClose={onClose}
    >
      <span className="close-btn" onClick={onClose}>&times;</span>

      {modalHeader && <FormModalHeader text={modalHeader}/>}

      <Form inputFields={inputFields}
            disableBtn={disableBtn}
            {...restFormProps}
      />
    </Modal>
  );
};
