import Modal from "../Modal";
import React, { useState } from "react";
import { Form } from "../../Common/Form";
import { FormModalHeader } from "../FormModalHeader";

function WriteAboutModal ({
                            isHidden = true,
                            onClose = () => {},
                            formProps = {},
                            modalTitle = '',
                            showSocialLinks = false,
                            setShowSocialLinks = () => {}
                          }) {
  const { fileInputRef, ...restFormProps } = formProps;
  const inputFields = [
    {
      name: 'aboutBodyInput',
      placeholder: `Who are you?`,
      type: 'textarea',
      title: 'Tell people about yourself',
      containerClass: 'labeled-input'
    },
    {
      name: 'aboutImgInput',
      type: 'file',
      title: 'Choose a photo of yourself',
      ref: fileInputRef,
      containerClass: 'labeled-input'
    },
    {
      name: 'addLinksBtn',
      title: showSocialLinks && 'Add social media profile links so people will follow:',
      type: 'button',
      onClick: () => setShowSocialLinks(true),
      value: 'Add social media link',
      inputClass: `add-links-btn ${!showSocialLinks ? 'show' : 'hide'}`,
      containerClass: 'labeled-input'
    },
    {
      name: 'facebookLink',
      title: <i className="fab fa-facebook-f"/>,
      type: showSocialLinks ? 'text' : 'hidden',
      placeholder: 'Facebook profile link (Optional)',
      labelClass: 'label-inside',
      inputClass: 'social-link-input',
      containerClass: `labeled-input ${showSocialLinks ? '' : 'hide'}`
    },
    {
      name: 'instagramLink',
      title: <i className="fab fa-instagram"/>,
      type: showSocialLinks ? 'text' : 'hidden',
      placeholder: 'Instagram profile link (Optional)',
      labelClass: 'label-inside',
      inputClass: 'social-link-input',
      containerClass: `labeled-input ${showSocialLinks ? '' : 'hide'}`
    },
    {
      name: 'twitterLink',
      title: <i className="fab fa-twitter"/>,
      type: showSocialLinks ? 'text' : 'hidden',
      placeholder: 'Twitter profile link (Optional)',
      labelClass: 'label-inside',
      inputClass: 'social-link-input',
      containerClass: `labeled-input ${showSocialLinks ? '' : 'hide'}`
    }
  ];

  const onCloseWrapper = () => {
    setShowSocialLinks(false);
    onClose();
  }

  return (
    <Modal outerContainerClass="form-modal center-container"
           innerContainerClass="form-modal__inner-container add-about-modal__inner-container"
           isHidden={isHidden}
           onClose={onCloseWrapper}
    >
      <span className="close-btn" onClick={onCloseWrapper}>&times;</span>
      {modalTitle && <FormModalHeader text={modalTitle}/>}
      <Form inputFields={inputFields} {...restFormProps}/>
    </Modal>
  );
}

export default WriteAboutModal;
