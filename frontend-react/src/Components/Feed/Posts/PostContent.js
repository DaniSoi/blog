import React from "react";
import { Highlighter } from "../Highlighter";

export const PostContent = ({
                              title = '',
                              subtitle = '',
                              body = '',
                              searchValue = '',
                              fullView = false,
                              onViewPost = () => {}
                            }) =>
  <section className="post__text">
    <h4 className="post__text-title">
      {searchValue.length ?
        <Highlighter search={searchValue} text={title}/> :
        title}
    </h4>
    <h5 className="post__text-subtitle">
      {searchValue.length ?
        <Highlighter search={searchValue} text={subtitle}/> :
        subtitle}
    </h5>
    <p className={`post__text-body ${fullView ? '' : 'long-text-ellipsis'}`}>
      {
        searchValue.length ?
          <Highlighter search={searchValue} text={body}/> :
          body
      }
    </p>
    {
      !fullView &&
      <button className="btn read-more-btn" onClick={onViewPost}>
        read more
      </button>
    }
  </section>
;
