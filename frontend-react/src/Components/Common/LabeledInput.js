import React from "react";

export function LabeledInput ({
                                containerClass = '',
                                labelClass = '',
                                inputClass = 'input',
                                error,
                                id,
                                type,
                                title,
                                forwardedRef,
                                ...restInputProps
                                // onChange,
                                // placeholder,
                                // value
                              }) {

  return (
    <div className={containerClass}>
      <label htmlFor={id} className={`${error ? 'error-text' : ''} ${labelClass}`}>
        {title}
      </label>
      {
        type === 'textarea' ?
          <textarea id={id}
                    className={`${error ? 'error-border' : ''} ${inputClass}`}
                    {...restInputProps}
          />
          :
          <input type={type}
                 ref={forwardedRef}
                 id={id}
                 name={id}
                 className={`${error ? 'error-border' : ''} ${inputClass}`}
                 {...restInputProps}
          />
      }
      <span className={`${error ? 'error-text' : ''}`}>{error}</span>
    </div>
  );
}

