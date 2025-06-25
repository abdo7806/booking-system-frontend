import axios from 'axios';

const API = axios.create({
	baseURL: 'https://localhost:7133/api',
		headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`, // أضف التوكن هنا
	},

});

export const fetchAvailabilities = async () => {

  const res = await API.get(`/Availability`);
	console.log("data", res.data)
  return res.data;
};

export const getAvailabilityById = async (id) => {
  const res = await API.get(`/Availability/${id}`);
  return res.data;
};

export const createAvailability = async (data) => {
  const res = await API.post(`/Availability`, data);
  return res.data;
};

export const updateAvailability = async (id, data) => {
  const res = await API.put(`/Availability/${id}`, data);
  return res.data;
};

export const deleteAvailability = async (id) => {
  const res = await API.delete(`/Availability/${id}`);
  return res.data;
};


// جلب الأوقات المتاحة لموظف وتاريخ معين
export const fetchAvailableTimes = async (staffId, date) => {
  const response = await API.get(`/Availability/times`, {
    params: { staffId, date }
  });
  return response.data;
};