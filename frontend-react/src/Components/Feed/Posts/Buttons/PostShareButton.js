import React from "react";
import { PostButton } from "./PostButton";

export const PostShareButton = ({onClick}) =>
  <PostButton className="share-btn" onClick={onClick}>
    <i className="fas fa-share"/>
  </PostButton>
;
