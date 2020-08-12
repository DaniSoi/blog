import { SearchBar } from "./SearchBar";
import React, { useState } from "react";
import { AddButton } from "./AddButton";
import { Posts } from "./Posts/Posts";
import { DeletePostModal } from "./DeletePostModal";
import { WritePostModal } from "./WritePostModal";
import { PageTemplate } from "../Common/PageTemplate";
import { useDispatch } from "react-redux";
import { useDebouncedSearch, usePosts } from "../../hooks";
import Error500 from "../Error500/Error500";
import LoadingProgress from "../Common/LoadingProgress";
import { FeedService } from "../../services";
import {
  addPostAction,
  editPostAction,
  deletePostAction } from "../../redux/actions";
import ProfileTemplate from "./ProfileTemplate";
import useFormModal from "../../hooks/useFormModal";
import { withChangeViewState } from "../../hoc";
import views from "../../redux/actions/feed-views";

let tmpTargetPostId = null;
const { filterPosts, validatePostForm } = new FeedService();

function PostsPage () {
  const storeDispatch = useDispatch();
  const [ hideDeletePostModal, setHideDeletePostModal ] = useState(true);
  const [ posts, isLoading, error ] = usePosts();
  const {
    searchInput, setSearchInput,
    searchResults, isSearching
  } = useDebouncedSearch(filterPosts, posts);
  const {
    inputs, setInputs, formErrors, setFormErrors,
    handleInputChange, fileInputRef,
    openModal, closeModal, isHidden
  } = useFormModal();

  const onSearch = e => setSearchInput(e.target.value);
  const openDeletePostModal = () => setHideDeletePostModal(false);

  const handleAddPost = e => {
    e.preventDefault();
    const errors = validatePostForm(inputs);
    if (Object.keys(errors).length) return setFormErrors(errors);

    storeDispatch(addPostAction(inputs));
    closeWritePostModal();
  };

  const handleEditPostButtonClick = e => {
    tmpTargetPostId = e.target.closest('article').id;
    const { title, body } = posts.find(({ id }) =>
      id === tmpTargetPostId
    );
    openEditPostModal(title, body);
  };

  const handleEditPost = e => {
    e.preventDefault();
    const errors = validatePostForm(inputs);
    if (Object.keys(errors).length) return setFormErrors(errors);

    storeDispatch(editPostAction(inputs, tmpTargetPostId));
    closeWritePostModal();
  };

  const handleDeletePostButtonClick = e => {
    tmpTargetPostId = e.target.closest('article').id;
    openDeletePostModal();
  };

  const handleDeletePost = () => {
    storeDispatch(deletePostAction(tmpTargetPostId));
    closeDeletePostModal();
  };

  const handleSharePostButtonClick = e => {
    console.log('share clicked');
  };

  const openEditPostModal = (title, body) => {
    setInputs({ postTitleInput: title, postBodyInput: body });
    openModal();
  };

  const closeWritePostModal = () => {
    tmpTargetPostId = null;
    closeModal();
  };

  const closeDeletePostModal = () => {
    tmpTargetPostId = null;
    setHideDeletePostModal(true);
  };

  const formProps = {
    inputValues: inputs,
    errors: formErrors,
    fileInputRef,
    buttonTitle: tmpTargetPostId ? 'SAVE' : 'PUBLISH',
    onChange: handleInputChange,
    onSubmit: tmpTargetPostId ?
      handleEditPost :
      handleAddPost
  };

  function renderPosts () {
    return (
      <div className="posts-container">
        {
          isLoading ?
            <LoadingProgress containerClass="center-container min-h-100"/>
            :
            <Posts
              posts={!searchInput.length || isSearching ? posts : searchResults}
              onDelete={handleDeletePostButtonClick}
              onEdit={handleEditPostButtonClick}
              onShare={handleSharePostButtonClick}
              // prevent highlight while waiting for search results
              searchValue={isSearching ? '' : searchInput}
              editable={true}
            />
        }
      </div>
    );
  }

  return (
    error ? <Error500/> :
      <PageTemplate>
        <ProfileTemplate>
          <div className="posts-page">
            <SearchBar onChange={onSearch}/>
            <AddButton onClick={openModal}/>
            {renderPosts()}
            <WritePostModal isHidden={isHidden}
                            formProps={formProps}
                            modalHeader={tmpTargetPostId ? "" : "New Post"}
                            onClose={closeWritePostModal}
                            disableBtn={false}
            />
            <DeletePostModal isHidden={hideDeletePostModal}
                             onClose={closeDeletePostModal}
                             onDelete={handleDeletePost}
            />
          </div>
        </ProfileTemplate>
      </PageTemplate>
  );
}

export default withChangeViewState(PostsPage, views.POSTS);
