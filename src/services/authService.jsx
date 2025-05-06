import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE}/api`
});

export const loginUser = (loginData) => API.post('/auth/login', loginData);
export const registerUser = (registerData) => API.post('/auth/register', registerData);