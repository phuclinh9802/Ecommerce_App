import axios from "axios";

const setAuthToken = (token) => {
  // if token exists
  if (token) {
    // apply token to every http request when logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // if not exists -> delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
