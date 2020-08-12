import React from "react";
import { API_URL } from "../../config";

const AboutMe = ({
                   imgId,
                   body = '',
                   fullView = true,
                   onReadMore,
                   editable = false,
                   onEdit = () => {}
                 }) =>
  <section className="about">
    <div className="about__inner-container">
      <div className="about__content">
      <h3 className="about__title feed-title">About Me</h3>
      {
        imgId &&
        <img className="about__img" src={
          `${API_URL}/feed/image/${imgId}`
        } alt=""/>
      }
      {
        //body &&
        <p className={`about__body ${fullView ? '' : 'long-text-ellipsis'}`}>
          {body}
        </p>
      }
      {
        !fullView &&
        <button className="btn read-more-btn" onClick={onReadMore}>
          {body ? 'read more' : 'add about'}
        </button>
      }
      </div>
      {
        editable &&
        <div className="about__tools">
          <button className="about__tools-btn edit-btn" onClick={onEdit}>
            <i className="fas fa-edit"/>
          </button>
        </div>
      }
    </div>
  </section>
;

export default AboutMe;
