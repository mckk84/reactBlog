import { createStore } from 'redux';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : { loggedIn: false, user };

export function authentication(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        loggedIn: true,
        user: action.user
      };
    case 'LOGIN_FAILURE':
      localStorage.removeItem('user');
      return { loggedIn: false, user: {} };
    case 'LOGOUT':
      localStorage.removeItem('user');
      return { loggedIn: false, user: {} };
    default:
      return state
  }
}
const store = createStore(authentication);

export default store;
