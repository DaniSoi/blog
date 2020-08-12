import { useRef, useState } from "react";

export default function useForm (onSubmit) {
  const [ inputs, setInputs ] = useState({});
  const [ formErrors, setFormErrors ] = useState({});
  const [ submitted, setSubmitted ] = useState(false);
  const fileInputRef = useRef(null);

  function handleInputChange (event) {
    const { name, value, files } = event.target;
    const newVal = files ? files[0] : value;
    setInputs({ ...inputs, [name]: newVal });
  }

  function handleSubmit (event) {
    event.preventDefault();
    onSubmit();
    setSubmitted(true);
  }

  return {
    fileInputRef,
    inputs,
    setInputs,
    submitted,
    formErrors,
    setFormErrors,
    handleInputChange,
    handleSubmit
  };
}
