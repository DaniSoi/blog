import React from "react";

const GoBackButton = ({onClick}) =>
  <div className="go-back-btn-container">
    <button className="go-back-btn" onClick={onClick}>
      <i className="fas fa-arrow-left"/>
    </button>
  </div>
;

export default GoBackButton;
