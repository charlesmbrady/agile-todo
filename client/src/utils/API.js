import axios from "axios";

export default {
  // // Logs the user out
  // logout: function () {
  //     localStorage.clear()
  // },
  // // Log the user in
  // login: function (user) {
  //     return axios.post('/auth/login', user).catch(err => { throw err });
  // },
  // // New user registration
  signup: function(user) {
    return axios.post("/auth/register", user);
  },
  ping: function() {
    return axios.get("/api/ping").catch(err => {
      throw err;
    });
  },
  createDecision: function() {
    return axios.get("/api/decisions").catch(err => {
      throw err;
    });
  }
};
