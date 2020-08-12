import React from "react";
import { PostButton } from "./PostButton";

export const PostDeleteButton = ({onClick}) =>
  <PostButton className="delete-btn" onClick={onClick}>
    <i className="fas fa-trash-alt"/>
  </PostButton>
;
