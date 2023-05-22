import axios from "axios";

export const AuthService = {
  async loginUser(user) {
    const response = await axios.post(
      "https://webstar-post-app.onrender.com/api/login",
      user
    );
    return response.data;
  },
  async getUser(token) {
    const response = await axios.get(
      "https://webstar-post-app.onrender.com/api",
      {
        headers: { access_token: token },
      }
    );
    return response.data.user;
  },
  async registerUser(user) {
    const response = await axios.post(
      "https://webstar-post-app.onrender.com/api/signup",
      user
    );
    return response.data;
  },
};
