import React from "react";
import { selectUsername } from "../../redux/selectors";
import { useSelector } from "react-redux";
import MainNavBar from "./MainNavBar";

export function Header () {
  const username = useSelector(selectUsername);

  return (
    <header className="header">
      <MainNavBar/>
      <div className="header__banner center-container">
        <div className="header__banner-content">
          <h1>
            {username && <span className="username">{username}'s </span>}
            Blog.
          </h1>
        </div>
      </div>
    </header>
  );
}
