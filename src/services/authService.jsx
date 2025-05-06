import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.FRONTEND_URL || 'http://localhost:5001'}/api`
});

export const loginUser = (loginData) => API.post('/auth/login', loginData);
export const registerUser = (registerData) => API.post('/auth/register', registerData);