// src/api/authApi.js
import axios from 'axios';

const API = axios.create({
  baseURL:  'https://localhost:7133/api',
});

export const login = async (credentials) => {
	console.log(credentials)
  const response = await API.post('/Auth/login', credentials);
  return response.data;
};


export const register = async (userData) => {
  const response = await API.post('/Auth/register', userData);
  return response.data;
};