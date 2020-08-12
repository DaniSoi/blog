import React from "react";

const Logout = ({ onLogout }) => (
  <button className="logout-btn"
          onClick={onLogout}
  >
    <i className="fas fa-sign-out-alt"/>
  </button>
);

export default Logout;
