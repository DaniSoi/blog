import React from "react";

export const PostButton = ({ onClick, className, children }) =>
  <button className={`post-btn ${className}`} onClick={onClick}>
    {children}
  </button>
;
