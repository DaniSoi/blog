import "../../style/form-pages/form-pages.css"
import React, { useLayoutEffect } from "react";
import { useApi, useForm } from "../../hooks";
import { PageTemplate } from "../Common/PageTemplate";
import { FormWrapper } from "../Common/FormWrapper";
import { Form } from "../Common/Form";
import { Link } from "react-router-dom";
import { RegisterService } from "../../services";
import Error500 from "../Error500/Error500";
import { bindParamsToCallback } from "../../utils";
import SuccessCheckmark from "../Common/SuccessCheckmark";
import { history } from "../../history";
import routes from "../../routes";
import SuccessText from "./SuccessText";

const INPUT_FIELDS = [
  { title: 'Username', type: 'text', name: 'username', placeholder: 'Enter username' },
  { title: 'Password', type: 'password', name: 'password', placeholder: 'Enter password' },
  { title: 'Email', type: 'text', name: 'email', placeholder: 'Enter your email' },
  { title: 'First Name', type: 'text', name: 'firstName', placeholder: 'Enter your first name' },
  { title: 'Last Name', type: 'text', name: 'lastName', placeholder: 'Enter your last name' },
  { title: 'Birthday', type: 'date', name: 'bday' }
];

const registerService = new RegisterService();

export default function Register () {
  const { isLoading, apiError, success, load } = useApi();
  const {
    inputs,
    formErrors,
    setFormErrors,
    handleInputChange,
    handleSubmit
  } = useForm(onRegister);

  useLayoutEffect(() => {
    //status 409 Conflict - violating unique email
    if (apiError && apiError.status === 409)
      setFormErrors({ email: 'Email already exists.' });
  }, [ apiError ]);

  async function onRegister () {
    const errors = registerService.validateRegisterForm(inputs);
    if (errors) return setFormErrors({ ...errors });

    const sendForm = bindParamsToCallback(registerService.register)(inputs);
    await load(sendForm);
  }

  function onSuccess () {
    setTimeout(() => history.push(routes.LOGIN), 10000);
  }

  return (
    success ?
      <SuccessCheckmark callback={onSuccess}>
        <SuccessText/>
      </SuccessCheckmark>
      :
      apiError && apiError.status === 500 ?
        <Error500/>
        :
        <PageTemplate>
          <FormWrapper formTitle="Create Account">
            <Form inputFields={INPUT_FIELDS}
                  inputValues={inputs}
                  buttonTitle="Sign Up"
                  onChange={handleInputChange}
                  onSubmit={handleSubmit}
                  errors={formErrors}
                  isLoading={isLoading}
            />
            <nav>
              <Link to="/" className="form-link">Already have an account?</Link>
            </nav>
          </FormWrapper>
        </PageTemplate>
  );
}
