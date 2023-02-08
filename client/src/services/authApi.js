import axios from "axios";

const API_URL = "http://localhost:8000/";

const userAuth = {};

userAuth.register = (username, email, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
  });
};

userAuth.login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => 
    {
      if( response.data.loggedIn ){
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

userAuth.logout = () => {
  localStorage.removeItem('user')
};

export default userAuth;