import React, { Fragment, useEffect, useState } from "react";
import { PageTemplate } from "../../Common/PageTemplate";
import ProfileTemplate from "../ProfileTemplate";
import AboutMe from "../AboutMe";
import LoadingProgress from "../../Common/LoadingProgress";
import WriteAboutModal from "./WriteAboutModal";
import Error500 from "../../Error500/Error500";
import { useSelector } from "react-redux";
import { selectUid } from "../../../redux/selectors";
import { useApi } from "../../../hooks";
import { FeedService } from "../../../services";
import { bindParamsToCallback } from "../../../utils";
import FollowMe from "../FollowMe";
import useFormModal from "../../../hooks/useFormModal";
import AddAboutButton from "./AddAboutButton";
import { withChangeViewState } from "../../../hoc";
import views from "../../../redux/actions/feed-views";

const { getAboutByUid, saveAbout, editAbout } = new FeedService();
let isEdit = false;

function AboutMePage () {
  const thisUid = useSelector(selectUid);
  const {
    inputs, setInputs, formErrors, setFormErrors,
    handleInputChange, fileInputRef,
    openModal, closeModal, isHidden
  } = useFormModal();
  const [ showSocialLinks, setShowSocialLinks ] = useState(false);
  const {
    data: { aboutContent, uid: aboutUid },
    isLoading, apiError, load
  } = useApi();

  useEffect(() => {
    load(bindParamsToCallback(getAboutByUid)(thisUid))
      .catch(e => console.log(e));
  }, []);

  function handleAddAbout (e) {
    e.preventDefault();
    const bodyInputName = 'aboutBodyInput';
    if (!inputs[bodyInputName]) {
      return setFormErrors({ [bodyInputName]: 'Required.' });
    }

    load(bindParamsToCallback(saveAbout)(inputs))
      .catch(e => console.log(e));

    closeModal();
  }

  function handleEditAbout (e) {
    e.preventDefault();
    const bodyInputName = 'aboutBodyInput';
    if (!inputs[bodyInputName]) {
      return setFormErrors({ [bodyInputName]: 'Required.' });
    }

    load(bindParamsToCallback(editAbout)(inputs))
      .catch(e => console.log(e));

    isEdit = false;
    closeModal();
  }

  function handleEditBtnClick (e) {
    e.preventDefault();
    isEdit = true;
    const { body, facebookLink, instagramLink, twitterLink } = aboutContent;
    setInputs({
      aboutBodyInput: body,
      facebookLink,
      instagramLink,
      twitterLink
    });
    setShowSocialLinks(true);
    openModal();
  }

  const formProps = {
    onSubmit: isEdit ? handleEditAbout : handleAddAbout,
    onChange: handleInputChange,
    fileInputRef,
    buttonTitle: isEdit ? 'SAVE' : 'PUBLISH',
    inputValues: inputs,
    errors: formErrors
  };

  return (
    apiError ?
      <Error500/>
      :
      <PageTemplate>
        <ProfileTemplate>
          {
            isLoading ?
              <LoadingProgress containerClass="center-container min-h-100"/>
              :
              <div className="about-me-page">
                {
                  !aboutContent ?
                    <AddAboutButton onClick={openModal}/>
                    :
                    <Fragment>
                      <AboutMe imgId={aboutContent?.imgId}
                               body={aboutContent?.body}
                               fullView={true}
                               editable={true}
                               onEdit={handleEditBtnClick}
                      />
                      <FollowMe facebookHref={aboutContent?.facebookLink}
                                instagramHref={aboutContent?.instagramLink}
                                twitterHref={aboutContent?.twitterLink}
                      />
                    </Fragment>
                }
                <WriteAboutModal isHidden={isHidden}
                                 onClose={closeModal}
                                 formProps={formProps}
                                 modalTitle={!isEdit && 'About'}
                                 showSocialLinks={showSocialLinks}
                                 setShowSocialLinks={setShowSocialLinks}
                />
              </div>
          }
        </ProfileTemplate>
      </PageTemplate>
  );
}

export default withChangeViewState(AboutMePage, views.ABOUT);
