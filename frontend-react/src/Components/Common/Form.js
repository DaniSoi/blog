import React from "react";
import { LabeledInput } from "./LabeledInput";
import LoadingProgress from "./LoadingProgress";

export const Form = ({
                       formClass = 'form',
                       inputFields = [],
                       inputValues = {},
                       errors = {},
                       buttonTitle = 'SUBMIT',
                       buttonClass = 'btn',
                       onChange = () => {},
                       onSubmit = () => {},
                       isLoading = false,
                       disableBtn = false
                     }) =>
  <form className={formClass} onSubmit={onSubmit}>
    {inputFields.map(({ ref, name, type, ...rest }) =>
      <LabeledInput key={name}
                    name={name}
                    type={type}
                    value={type === 'file' ? undefined : (inputValues[name] || '')}
                    forwardedRef={ref}
                    error={errors[name]}
                    onChange={onChange}
                    {...rest}
      />
    )}
    {
      isLoading ?
        <LoadingProgress containerClass="form-loading center-container"/>
        :
        <button type="submit"
                className={buttonClass}
                disabled={disableBtn}
        >
          {buttonTitle}
        </button>
    }
  </form>
;
