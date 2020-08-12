import React, { useState } from "react";
import { Post } from "./Posts/Post";
import { useFetchDataEffect } from "../../hooks";
import { API_URL } from "../../config";
import Error500 from "../Error500/Error500";
import { PageTemplate } from "../Common/PageTemplate";
import LoadingProgress from "../Common/LoadingProgress";
import { useDispatch, useSelector } from "react-redux";
import { changeFeedViewAction } from "../../redux/actions/actions";
import views from "../../redux/actions/feed-views";
import GoBackButton from "./GoBackButton";
import useFormModal from "../../hooks/useFormModal";
import { deletePostAction, editPostAction } from "../../redux/actions";
import { FeedService } from "../../services";
import { WritePostModal } from "./WritePostModal";
import { DeletePostModal } from "./DeletePostModal";
import { selectPosts } from "../../redux/selectors";
import { history } from "../../history";

const POSTS_URL = `${API_URL}/feed/posts`;
const reqConfig = { timeout: 60000, withCredentials: true };
const { validatePostForm } = new FeedService();

function SinglePostPage ({ match }) {
  const storeDispatch = useDispatch();
  const { isLoading, error } = useSelector(selectPosts);
  const [ post, fetchLoading, fetchError ] = useFetchDataEffect(
    `${POSTS_URL}/${match.params.id}`, reqConfig
  );
  const {
    inputs, setInputs, formErrors, setFormErrors,
    handleInputChange, fileInputRef,
    openModal, closeModal, isHidden
  } = useFormModal();
  const [ hideDeletePostModal, setHideDeletePostModal ] = useState(true);

  const openDeletePostModal = () => setHideDeletePostModal(false);

  const handleEditPostButtonClick = e => {
    const { title, body } = post;
    openEditPostModal(title, body);
  };

  const handleEditPost = e => {
    e.preventDefault();
    const errors = validatePostForm(inputs);
    if (Object.keys(errors).length) return setFormErrors(errors);

    storeDispatch(editPostAction(inputs, post.id));
    closeModal();
  };

  const handleDeletePostButtonClick = e => {
    openDeletePostModal();
  };

  const handleDeletePost = () => {
    storeDispatch(deletePostAction(post.id));
    closeDeletePostModal();
  };

  const handleSharePostButtonClick = e => {
    console.log('share clicked');
  };

  const openEditPostModal = (title, body) => {
    setInputs({ postTitleInput: title, postBodyInput: body });
    openModal();
  };

  const closeDeletePostModal = () => {
    setHideDeletePostModal(true);
  };

  const formProps = {
    inputValues: inputs,
    errors: formErrors,
    fileInputRef,
    buttonTitle: 'SAVE',
    onChange: handleInputChange,
    onSubmit: handleEditPost
  };

  const handleGoBack = () => history.push(`/${views.FEED}`);//storeDispatch(changeFeedViewAction(views.FEED));

  //TODO fix edit post bug and fix api error/loading
  return (
    error || fetchError ? <Error500/> :
      <PageTemplate>
        {
          isLoading || fetchLoading ?
            <LoadingProgress containerClass="center-container min-h-100"/>
            :
            <div className="single-post-page">
              <GoBackButton onClick={handleGoBack}/>
              <Post editable={true}
                    fullView={true}
                    onDelete={handleDeletePostButtonClick}
                    onEdit={handleEditPostButtonClick}
                    onShare={handleSharePostButtonClick}
                    {...post}
              />
              <WritePostModal isHidden={isHidden}
                              formProps={formProps}
                              onClose={closeModal}
                              disableBtn={false}
              />
              <DeletePostModal isHidden={hideDeletePostModal}
                               onClose={closeDeletePostModal}
                               onDelete={handleDeletePost}
              />
            </div>
        }
      </PageTemplate>
  );
}

export default SinglePostPage;
