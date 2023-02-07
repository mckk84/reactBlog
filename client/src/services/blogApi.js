import axios from "axios";

const API_URL = "http://localhost:8000/";

const blogs = {};

blogs.all = () => {
  return axios.get(API_URL + "blogs");
};

blogs.login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    });
};

blogs.logout = () => {
  localStorage.removeItem('user')
};

export default blogs;