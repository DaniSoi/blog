import React from 'react';
import { Post } from "./Post";
import { Message } from "../Message";

const msgs = {
  noPosts: {
    title: "No Posts Yet.",
    // body: "Feel free to add new posts to your blog."
    // body: "Click the 'Add' button on the right to add new posts to your blog."
  },
  notFound: {
    title: "Not Found.",
    body: "Try to search something else..."
  }
}

export const Posts = ({
                        posts = [],
                        className = "posts-container",
                        searchValue = '',
                        ...btnHandlers
                      }) =>
  <div className={className}>
    {
      posts.length ?
        posts.map(({ id, ...postProps }, i) =>
          <Post key={id}
                id={id}
                containerClass={i === 0 ? 'first-post' : 'reg-post'}
                searchValue={searchValue}
                {...postProps} {...btnHandlers}
          />)
        :
        searchValue.length ?
          <Message {...msgs.notFound} />
          :
          <Message {...msgs.noPosts} />
    }
  </div>
;

