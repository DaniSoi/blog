import React from "react";
import { Nav } from "../Common/Nav";

const itemClass = 'social-nav__item';
const linkClass = 'social-nav__link';

function SocialMediaNavBar ({facebookHref, instagramHref, twitterHref}) {
  const socialMediaLinks = [
    {
      itemClass,
      linkClass,
      href: facebookHref || 'https://www.facebook.com',
      target: '_blank',
      children: <i className="fab fa-facebook-f"/>
    },
    {
      itemClass,
      linkClass,
      href: instagramHref || 'https://www.instagram.com',
      target: '_blank',
      children: <i className="fab fa-instagram"/>
    },
    {
      itemClass,
      linkClass,
      href: twitterHref || 'https://www.twitter.com',
      target: '_blank',
      children: <i className="fab fa-twitter"/>
    }
  ];

  return (
    <Nav links={socialMediaLinks}
         navClass="social-nav"
         innerContainerClass="social-nav__inner-container"
    />
  );
}

export default SocialMediaNavBar;
