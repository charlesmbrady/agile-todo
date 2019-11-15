import axios from "axios";

export default {
  // Logs the user out
  //   logout: function() {
  //     localStorage.clear();
  //   },
  // Log the user in
  login: function(user) {
    return axios.post("/auth/authenticate", user).catch(err => {
      throw err;
    });
  },
  // New user registration
  signup: function(user) {
    return axios.post("/auth/register", user);
  },
  checkToken: function() {
    return axios.get("/auth/checkToken").catch(err => {
      throw err;
    });
  },
  logout: function() {
    return axios.get("/auth/logout").catch(err => {
      throw err;
    });
  }
};
