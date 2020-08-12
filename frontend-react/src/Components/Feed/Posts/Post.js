import React from "react";
import { PostContent } from "./PostContent";
import { PostToolsBar } from "./PostToolsBar";
import { API_URL } from "../../../config";
import { history } from "../../../history";

const viewPost = e => {
  const targetPostId = e.target.closest('.post').id;
  history.push(`/posts/${targetPostId}`);
}

export const Post = ({
                       title = '',
                       body = '',
                       imgId,
                       id,
                       createdAt,
                       onViewPost = viewPost,
                       onShare = () => {},
                       onEdit = () => {},
                       onDelete = () => {},
                       searchValue = '',
                       containerClass = '',
                       fullView = false,
                       editable = false
                     }) =>
  <article className={`post ${containerClass}`} id={id}>
    {
      imgId &&
      <img className="post__img" src={
        `${API_URL}/feed/image/${imgId}`
      } alt=""/>
    }
    <PostContent title={title}
                 body={body}
                 searchValue={searchValue}
                 fullView={fullView}
                 onViewPost={onViewPost}
    />
    <PostToolsBar onShare={onShare}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  createdAt={createdAt}
                  editable={editable}
    />
  </article>
;
