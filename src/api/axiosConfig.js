import axios from 'axios';

// This creates a central place for your API settings
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api'
});

// This is the advanced part from your plan (Step 4: Secure APIs)
// It automatically adds the JWT token to every request after you log in.
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default apiClient;