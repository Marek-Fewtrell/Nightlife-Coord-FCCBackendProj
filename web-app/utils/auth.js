import axios from 'axios';

import Router from 'vue-router';
var router = new Router({
   mode: 'history',
});

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

export function loginCreds(credentials) {
  //console.log("in loginCreds")
  //console.log(credentials)

  const BASE_URL = 'http://localhost:23200';
  const url = `${BASE_URL}/authenticate`;
  axios.post(url, {loginCredentials: credentials}).then(function (response) {
    console.log(response.data)
    if (response.data.success == true) {
      setIdToken('user')
      setAccessToken(response.data.token)
      router.push('Places')
    } else {
      console.log("login creds was unsuccessful.")
    }
  })
}

export function register(credentials) {
  const BASE_URL = 'http://localhost:23200';
  const url = `${BASE_URL}/register`;
  axios.post(url, {registerCredentials: credentials}).then(function (response) {
    console.log(response.data)
    if (response.data.success == true) {
      console.log("Register successful.")
    } else {
      console.log("Register was unsuccessful.")
    }
  })
}

export function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}

export function logout() {
  clearIdToken();
  clearAccessToken();
  router.go('/');
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Get and store access_token in local storage
export function setAccessToken(token) {
  //let accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

// Get and store id_token in local storage
export function setIdToken(id) {
  //let idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, id);
}

export function isLoggedIn() {
  /*const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);*/
  const idToken = getIdToken();
  const token = getAccessToken();
  return (idToken === 'user' && token)
}
