import React from "react";
import { LabeledInput } from "../Common/LabeledInput";

export const SearchBar = ({ onChange }) =>
  <div className="search-posts">
    <div className="search-posts__inner-container center-container">
    <LabeledInput inputClass="search-posts__input"
                  containerClass="search-posts__input-container"
                  type="text"
                  onChange={onChange}
                  placeholder="Search..."
    />
    {/*<i className="material-icons search-posts__icon">search</i>*/}
        <i className="fas fa-search search-posts__icon"/>
    </div>
  </div>
;
