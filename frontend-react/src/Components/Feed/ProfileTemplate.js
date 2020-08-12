import React, { Fragment, useState } from "react";
import ProfileNav from "./ProfileNav";

function ProfileTemplate ({ children }) {
  useState();
  return (
    <Fragment>
      <ProfileNav/>
      {children}
    </Fragment>
  );
}

export default ProfileTemplate;
