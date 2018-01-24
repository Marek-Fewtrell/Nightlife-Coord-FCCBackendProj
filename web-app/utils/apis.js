import axios from 'axios';

const BASE_URL = 'http://localhost:23200';

export { getPlacesApi };

function getPlacesApi() {
  console.log("in getPlacesApi function of apis.js")
  const url = `${BASE_URL}/api/places`;
  return axios.get(url).then(response => response.data);
}
