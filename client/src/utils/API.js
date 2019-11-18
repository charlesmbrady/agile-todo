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
  },
  getAllSprints: function(userId) {
    return axios.get(`/api/sprints/user/${userId}`).catch(err => {
      throw err;
    });
  },
  createTodo: function(todo) {
    return axios.post(`/api/todos`, todo).catch(err => {
      throw err;
    });
  },
  updateTodo: function(todo) {
    return axios.put(`/api/todos`, todo).catch(err => {
      throw err;
    });
  },
  createSprint: function(sprint) {
    return axios.post(`/api/sprints`, sprint).catch(err => {
      throw err;
    });
  },
  updateSprint: function(sprint) {
    return axios.post(`/api/sprints`, sprint).catch(err => {
      throw err;
    });
  },
  startSprint: function(sprintId) {
    return axios.post(`/api/sprints/activate`, sprintId).catch(err => {
      throw err;
    });
  },
  getActiveSprint: function(userId) {
    return axios.get(`/api/sprints/active/${userId}`).catch(err => {
      throw err;
    });
  }
};
