import { Message } from "./Message";
import React from "react";

export const MsgsContainer = ({msgs}) =>
  <div className="container">
    {msgs.map((msg, i) => <Message key={(i + msg)} {...msg}/>)}
  </div>
;