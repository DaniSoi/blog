import React from "react";
import { PostShareButton } from "./Buttons/PostShareButton";
import { PostDeleteButton } from "./Buttons/PostDeleteButton";
import { PostEditButton } from "./Buttons/PostEditButton";

export const PostToolsBar = ({
                               onShare,
                               onEdit,
                               onDelete,
                               createdAt,
                               editable = false
                             }) =>
  <section className="post-tools-bar">
    <div className="post-tools-bar__info">
      <i className="post-tools-bar__info-timestamp">
        {new Date(createdAt)
          .toLocaleString("en-US", { timeZone: "Asia/Jerusalem" })}
      </i>
    </div>
    {
      editable &&
      <div className="post-tools-bar__btns">
        <PostShareButton onClick={onShare}/>
        <PostEditButton onClick={onEdit}/>
        <PostDeleteButton onClick={onDelete}/>
      </div>
    }
  </section>
;
