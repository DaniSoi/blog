import "../../style/form-pages/form-pages.css";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthentication } from "../../redux/selectors";
import { loginAction } from "../../redux/actions";
import { useForm } from "../../hooks";
import { PageTemplate } from "../Common/PageTemplate";
import { FormWrapper } from "../Common/FormWrapper";
import { Form } from "../Common/Form";
import { Link } from "react-router-dom";

const INPUT_FIELDS = [
  { title: 'Email', type: 'email', name: 'email', placeholder: 'Enter email' },
  { title: 'Password', type: 'password', name: 'password', placeholder: 'Enter password' }
];

export default function Login () {
  const storeDispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector(selectAuthentication);
  const { inputs, handleInputChange, handleSubmit, submitted } = useForm(onLogin);
  const [ error, setError ] = useState('');

  useLayoutEffect(() => {
    if (!isAuthenticated && !isLoading && submitted)
      setWrongDetailsError();
  }, [ isLoading ]);

  function onLogin () {
    const { email, password } = inputs;
    if (!isFormValid(email, password)) return setMissingDetailsError();
    storeDispatch(loginAction(email, password));
  }

  function isFormValid (email, password) {
    return email && password;
  }

  function setMissingDetailsError () {
    setError('Must fill all required details.');
  }

  function setWrongDetailsError () {
    setError('Wrong Username or Password.');
  }

  return (
    <PageTemplate>
      <FormWrapper formTitle="Sign In">
        <Form inputFields={INPUT_FIELDS}
              inputValues={inputs}
              buttonTitle="sign in"
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
        />
        <span style={{ color: 'red' }}>{error}</span>
        <nav>
          <Link to="register" className="form-link">
            Create account
          </Link>
        </nav>
      </FormWrapper>
    </PageTemplate>
  );
}
