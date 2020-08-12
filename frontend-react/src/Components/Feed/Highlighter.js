import React from "react";

export const Highlighter = ({search, text}) => {
  //TODO fix \\\\\\ search
  const regex = new RegExp(`(${search})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      { parts.map((part, i) =>
        regex.test(part) ?
          <span key={(i + part)} className="highlight-search">
            {part}
          </span>
          :
          part
      )}
    </span>
  );
};
