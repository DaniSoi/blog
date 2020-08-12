import React from "react";
import AboutMePage from "./AboutMePage";

const AddAboutButton = ({ onClick }) =>
  <div className="add-about-btn-container">
    <span>Click the Plus button to add an "About" section</span>
    <button onClick={onClick}><i className="fas fa-plus"/></button>
  </div>
;

export default AddAboutButton;
