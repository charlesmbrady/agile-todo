import axios from "axios";

export default {
  ping: function() {
    return axios.get("/api/ping").catch(err => {
      throw err;
    });
  },
  getAllTodos: function(userId) {
    return axios.get(`/api/todos/user/${userId}`).catch(err => {
      throw err;
    });
  }
};
