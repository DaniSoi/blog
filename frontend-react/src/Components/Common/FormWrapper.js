import { Form } from "./Form";
import { Link } from "react-router-dom";
import React, { Fragment } from "react";

export const FormWrapper = ({formTitle, children}) =>
  <div className="form-container">
    {formTitle ?
      <Fragment>
        <h3>{formTitle}</h3>
        <hr/>
      </Fragment> :
      null}
    {children}
  </div>
;
