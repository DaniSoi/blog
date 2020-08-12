import { Nav } from "../Common/Nav";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFeedView } from "../../redux/selectors";
import views from "../../redux/actions/feed-views";
import { changeFeedViewAction } from "../../redux/actions/actions";
import { history } from "../../history";

const itemClass = 'profile-nav__item';
const linkClass = 'profile-nav__link';
const activeLinkClass = 'active-link';

function ProfileNav () {
  const storeDispatch = useDispatch();
  const currView = useSelector(selectFeedView);
  const onClick = e => {
    e.preventDefault();
    history.push(`/${e.target.name}`)
    // storeDispatch(changeFeedViewAction(e.target.name))
  };

  const navLinks = [
    {
      name: views.FEED,
      children: 'Activity',
      itemClass,
      linkClass,
      onClick
    },
    {
      name: views.POSTS,
      children: 'Posts',
      itemClass,
      linkClass,
      onClick
    },
    {
      name: views.ABOUT,
      children: 'About',
      itemClass,
      linkClass,
      onClick
    }
  ];

  return (
    <Nav links={navLinks}
         navClass="profile-nav center-container"
         innerContainerClass="profile-nav__inner-container"
         activeLink={currView}
         activeLinkClass={activeLinkClass}
    />
  );
}

export default ProfileNav;
