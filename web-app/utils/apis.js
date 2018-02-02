import axios from 'axios';

const BASE_URL = 'http://localhost:23200';

export { getPlacesApi, putAttendanceApi, deleteAttendanceApi };

import { isLoggedIn, getAccessToken, clearAccessToken } from './auth'

function getPlacesApi() {
  console.log("in getPlacesApi function of apis.js")
  const url = `${BASE_URL}/api/places`;
  let headers
  if (isLoggedIn()) {
    headers = { headers: { Authorization: `Bearer ${getAccessToken()}` } }
    //return axios.get(url, headers).then(response => response.data);
    /*axios.get(url, headers).then(
      function(response) {
        console.log("here")
        console.log(response.data)
        return response.data
      }
    )*/
  }
  //return axios.get(url).then(response => response.data);
  return axios.get(url, headers).then(
    function(response) {
      if (response.data.success) {
        if (response.data.token === false) {
          clearAccessToken()
        }
        console.log(response.data)
        return response.data.places
      }
    }
  )
}

function putAttendanceApi(placeId, token, userAttendance) {
  console.log("in putAttendanceApi function of apis.js")
  console.log(placeId)
  console.log(token)
  console.log(userAttendance)
  const url = `${BASE_URL}/api/attendance`;
  var data = {
    placeId: placeId,
    token: token,
    userAttendance: userAttendance
  }
  var headers = { headers: { Authorization: `Bearer ${getAccessToken()}` } }
  return axios.put(url, data, headers).then(response => response.data);
}

/*function deleteAttendanceApi(placeId, token) {
  console.log("in getPlacesApi function of apis.js")
  const url = `${BASE_URL}/api/attendance`;
  return axios.delete(url).then(response => response.data);
}*/
