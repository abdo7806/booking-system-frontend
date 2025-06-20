// src/api/staffApi.js
import axios from 'axios';

const API = axios.create({
	baseURL: 'https://localhost:7133/api',
		headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`, // أضف التوكن هنا
	},

});

// CRUD operations
export const getAllService = () => API.get('/Service');
export const getServicefById = (id) => API.get(`/Service/${id}`);
export const createService = (staffData) => API.post('/Service', staffData);
export const updateService = (id, staffData) => API.put(`/Service/${id}`, staffData);
export const deleteService = (id) => API.delete(`/Service/${id}`);
