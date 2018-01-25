import axios from 'axios';

const BASE_URL = 'http://localhost:23200';

export { getPlacesApi, putAttendanceApi, deleteAttendanceApi };

function getPlacesApi() {
  console.log("in getPlacesApi function of apis.js")
  const url = `${BASE_URL}/api/places`;
  return axios.get(url).then(response => response.data);
}

function putAttendanceApi(placeId, token, userAttendance) {
  console.log("in putAttendanceApi function of apis.js")
  const url = `${BASE_URL}/api/attendance`;
  var data = {
    placeId: placeId,
    token: token,
    userAttendance: userAttendance
  }
  return axios.put(url, data).then(response => response.data);
}

function deleteAttendanceApi(placeId, token) {
  console.log("in getPlacesApi function of apis.js")
  const url = `${BASE_URL}/api/attendance`;
  return axios.delete(url).then(response => response.data);
}
