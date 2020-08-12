import axios from "axios";
import { API_URL } from "../config";

export default class UserService {
  async login (email, password) {
    return axios.post(
      `${API_URL}/sessions`,
      { email, password },
      { withCredentials: true }
    );
  }

  async logout () {
    return axios.delete(
      `${API_URL}/sessions`,
      { withCredentials: true }
    );
  }
}
