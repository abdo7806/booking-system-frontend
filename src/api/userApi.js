import axios from 'axios';

const API = axios.create({
	baseURL: 'https://localhost:7133/api',
		headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`, // أضف التوكن هنا
	},
});

export const fetchUsers = async () => {
  const response = await API.get(`/users`);
  return response.data;
};
// ارجاع كل العملاء
export const fetchClients = async () => {
  const response = await API.get(`/Users/clients`);
  return response.data;
};

export const getUserById = async (id) => {
  const response = await API.get(`/Users/${id}`);
  return response.data;
};

export const createUser = async (data) => {
  
  const response = await API.post(`/Users`, data);
  return response.data;
};

export const updateUser = async (id, data) => {
  const response = await API.put(`/Users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await API.delete(`/users/${id}`);
  return response.data;
};
