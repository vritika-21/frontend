import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001/api' }); // Update if you deploy backend

export const loginUser = (loginData) => API.post('/auth/login', loginData);
export const registerUser = (registerData) => API.post('/auth/register', registerData);