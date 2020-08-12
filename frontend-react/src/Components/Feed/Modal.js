import React, { useEffect, useRef } from "react";
import * as PropTypes from "prop-types";

export default function Modal ({
                                 isHidden,
                                 children,
                                 outerContainerClass,
                                 innerContainerClass,
                                 onClose
                               }) {
  const _modal = useRef();

  useEffect(() => {
    const handleMouseClick = e => {
      if (e.target === _modal.current) {
        onClose();
      }
    };

    const handleKeyboardClick = e => {
      if (e.key === 'Escape') {
        if (!isHidden) {
          onClose();
        }
      }
    };

    window.addEventListener('click', handleMouseClick);
    window.addEventListener('keyup', handleKeyboardClick);

    return () => {
      window.removeEventListener('click', handleMouseClick);
      window.removeEventListener('keyup', handleKeyboardClick);
    };
  }, [isHidden]);


  return (
    <div ref={_modal}
         className={`modal ${outerContainerClass} ${isHidden ? "hide" : "show"}`}>
      <div className={`modal-content ${innerContainerClass} animated fadeIn`}>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired
};
