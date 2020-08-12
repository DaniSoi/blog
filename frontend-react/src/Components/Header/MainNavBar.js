import React, { Fragment } from "react";
import logo from "../../assets/logo.png";
import SocialMediaNavBar from "./SocialMediaNavBar";
import { logoutAction } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Logout from "../Feed/Logout";
import { selectIsAuthenticated } from "../../redux/selectors";

function MainNavBar () {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const storeDispatch = useDispatch();
  const handleLogout = () => storeDispatch(logoutAction());

  return (
    <div className="nav-bar">
      <div className="logo-wrapper">
        <img src={logo} alt="" className="logo"/>
      </div>
      {
        isAuthenticated &&
          <Fragment>
            <SocialMediaNavBar />
            <Logout onLogout={handleLogout}/>
          </Fragment>
      }
    </div>
  );
}

export default MainNavBar;
