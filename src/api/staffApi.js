// src/api/staffApi.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://localhost:7133/api',
	  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`, // أضف التوكن هنا
  },

});

// CRUD operations
export const getAllStaff = () => API.get('/staff');
export const getStaffById = (id) => API.get(`/staff/${id}`);
export const createStaff = (staffData) => API.post('/staff', staffData);
export const updateStaff = (id, staffData) => API.put(`/staff/${id}`, staffData);
export const deleteStaff = (id) => API.delete(`/staff/${id}`);
