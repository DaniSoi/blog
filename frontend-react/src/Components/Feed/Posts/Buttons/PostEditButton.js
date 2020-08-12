import React from "react";
import { PostButton } from "./PostButton";

export const PostEditButton = ({onClick}) =>
  <PostButton className="edit-btn" onClick={onClick}>
    <i className="fas fa-edit"/>
  </PostButton>
;
