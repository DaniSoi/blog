import React from "react";

export const Message = ({title, body}) =>
  <div className="msg">
    <h4>{title}</h4>
    <p>{body}</p>
  </div>
;