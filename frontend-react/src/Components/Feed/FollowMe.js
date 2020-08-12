import React from "react";
import SocialMediaNavBar from "../Header/SocialMediaNavBar";

const FollowMe = ({ ...hrefs }) =>
  <section className="follow-me">
    <div className="follow-me__inner-container">
    <h3 className="follow-me__title feed-title">
      Follow Me
    </h3>
    <SocialMediaNavBar {...hrefs}/>
    </div>
  </section>
;

export default FollowMe;
