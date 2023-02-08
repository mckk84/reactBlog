import axios from "axios";

const API_URL = "http://localhost:8000/";

const blogs = {};

blogs.all = () => {
  return axios.get(API_URL + "blogs");
};

blogs.find = (id) => {
  return axios.get(API_URL + "blogs/"+id);
};


export default blogs;