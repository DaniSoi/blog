import axios from "axios";
import { API_URL } from "../config";
import Joi from "@hapi/joi";

const schema = Joi.object({
  username: Joi.string()
               .alphanum()
               .pattern(/(?=.*[a-z]|[A-Z])/)
               .min(3).max(30)
               .required(),
  password: Joi.string()
               .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
               .max(50)
               .required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).required(),
  firstName: Joi.string().min(2).max(20).required(),
  lastName: Joi.string().min(2).max(20).required(),
  bday: Joi.date().required()
});

const ERR_MSGS = {
  username: "Must be 3-30 characters long and contain at least one letter",
  password: "Must be 8-50 characters long and contain at least one uppercase letter and one lowercase letter",
  email: "Please enter a valid email",
  firstName: "Must be 2-20 characters long",
  lastName: "Must be 2-20 characters long",
  bday: "Please enter a valid birthday"
};

const USR_URL = `${API_URL}/users`;

export default class RegisterService {
  async register (userDetails) {
    return axios.post(
      USR_URL,
      { ...userDetails },
      { withCredentials: true }
    );
  }

  validateRegisterForm (formInputs) {
    const { error } = schema.validate(formInputs, { abortEarly: false });
    if (!error) return null;

    const res = {};
    error.details.forEach(err => {
      // extracts the invalid input name from the error message
      const inputName = err.message.split('"', 2)[1];
      res[inputName] = ERR_MSGS[inputName];
    });

    return res;
  }

  async confirmUser (token) {
    return axios.post(`${USR_URL}/confirmation`, {
      token
    });
  }
}

