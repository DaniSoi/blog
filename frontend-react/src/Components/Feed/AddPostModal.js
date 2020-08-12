import { WritePostModal } from "./WritePostModal";
import React from "react";
import { addPostAction } from "../../redux/actions";

function AddPostModal (props) {
  const handleAddPost = async e => {
    e.preventDefault();
    const errors = validatePostForm(writePostModal.inputValues);
    if (Object.keys(errors).length) return setFormErrors(errors);

    await storeDispatch(addPostAction(writePostModal.inputValues));
    closeWritePostModal();
  };

  return (
    <WritePostModal isHidden={writePostModal.hide}
                    formProps={getWritePostFormProps()}
                    modalHeader="New Post"
                    onClose={closeWritePostModal}
                    disableBtn={false}
    />
  );
}
