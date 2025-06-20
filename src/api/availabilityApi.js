import axios from 'axios';

const API = axios.create({
	baseURL: 'https://localhost:7133/api',
		headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`, // أضف التوكن هنا
	},

});

export const fetchAvailabilities = async () => {
  const res = await axios.get(`${API}/availabilities`);
  return res.data;
};

export const getAvailabilityById = async (id) => {
  const res = await axios.get(`${API}/availabilities/${id}`);
  return res.data;
};

export const createAvailability = async (data) => {
  const res = await axios.post(`${API}/availabilities`, data);
  return res.data;
};

export const updateAvailability = async (id, data) => {
  const res = await axios.put(`${API}/availabilities/${id}`, data);
  return res.data;
};

export const deleteAvailability = async (id) => {
  const res = await axios.delete(`${API}/availabilities/${id}`);
  return res.data;
};
