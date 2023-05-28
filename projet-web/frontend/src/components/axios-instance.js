

import axios from 'axios';

// Create a custom instance of Axios
export default axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: true,
});
