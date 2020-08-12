import React from "react";
import { Posts } from "./Posts/Posts";
import { PageTemplate } from "../Common/PageTemplate";
import { useDispatch, useSelector } from "react-redux";
import { useFetchDataEffect } from "../../hooks";
import Error500 from "../Error500/Error500";
import LoadingProgress from "../Common/LoadingProgress";
import { API_URL } from "../../config";
import { selectUid } from "../../redux/selectors";
import AboutMe from "./AboutMe";
import ProfileTemplate from "./ProfileTemplate";
import FollowMe from "./FollowMe";
import { changeFeedViewAction } from "../../redux/actions/actions";
import views from "../../redux/actions/feed-views";
import { withChangeViewState } from "../../hoc";
import { history } from "../../history";

const FEED_URL = `${API_URL}/feed`;
const reqConfig = { timeout: 60000, withCredentials: true };

function Feed () {
  const storeDispatch = useDispatch();
  const thisUid = useSelector(selectUid);
  const [
    { latestPosts, aboutSection, uid: feedUid },
    loading,
    error ] = useFetchDataEffect(`${FEED_URL}/${thisUid}`, reqConfig);

  const handleReadAbout = () => history.push(views.ABOUT);//storeDispatch(changeFeedViewAction(views.ABOUT));

  return (
    error ? <Error500/> :
      <PageTemplate>
        <ProfileTemplate>
          {
            loading ?
              <LoadingProgress containerClass="center-container min-h-100"/>
            :
              <div className="feed">
                <div className="feed__activity">
                  <div className="feed__activity-inner-container">
                    <h3 className="feed__activity-title feed-title">
                      Latest Activity
                    </h3>
                    <Posts className='feed__activity-posts' posts={latestPosts} editable={false}/>
                  </div>
                </div>
                <div className="feed__about-section">
                <AboutMe body={aboutSection?.body}
                         imgId={aboutSection?.imgId}
                         fullView={false}
                         onReadMore={handleReadAbout}
                />
                <FollowMe facebookHref={aboutSection?.facebookLink}
                          instagramHref={aboutSection?.instagramLink}
                          tweeterHref={aboutSection?.twitterLink}
                />
                </div>
              </div>
          }
        </ProfileTemplate>
      </PageTemplate>
  );
}

export default withChangeViewState(Feed, views.FEED);
