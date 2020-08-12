import { useForm } from "./index";
import { useState } from "react";

function useFormModal (onFormSubmit) {
  const {
    inputs, setInputs, formErrors, setFormErrors,
    handleInputChange, handleSubmit, fileInputRef
  } = useForm(onFormSubmit);
  const [ isHidden, setIsHidden ] = useState(true);

  function openModal () {
    setIsHidden(false);
  }

  function closeModal () {
    setIsHidden(true);
    setFormErrors({});
    if (fileInputRef.current) fileInputRef.current.value = null;
    setInputs(prevState => {
      let newState = {};
      for (const key in prevState) {
        newState = { ...newState, [key]: '' };
      }
      return newState;
    });
  }

  return {
    inputs, setInputs, formErrors, setFormErrors,
    handleInputChange, handleSubmit, fileInputRef,
    openModal, closeModal, isHidden
  };
}

export default useFormModal;
