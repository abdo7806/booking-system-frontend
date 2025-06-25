import axios from 'axios';


const API = axios.create({
	baseURL: 'https://localhost:7133/api',
		headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`, // أضف التوكن هنا
	},

});

export const fetchAppointments = async () => {
  const res = await API.get(`/appointments`);
  return res.data;
};

export const getAppointmentById = async (id) => {
  const res = await API.get(`/appointments/${id}`);
  return res.data;
};

export const getAppointmentByClientId = async (clientId) => {
  const res = await API.get(`/appointments/client/${clientId}`);


  return res.data;
};

export const createAppointment = async (data) => {

  const res = await API.post(`/appointments/create`, data);
  return res.data;
};

export const deleteAppointment = async (id) => {
  const res = await API.delete(`/appointments/${id}`);
  return res.data;
};

export const updateAppointmentStatus = async ({ id, status }) => {
  const res = await API.put(`/appointments/${id}/status?status=${status}`);
  return res.data;
};


// جلب الأوقات المتاحة لموظف وتاريخ معين
export const fetchAvailableTimes = async (staffId, date) => {
  const response = await API.get(`/Availability/times`, {
    params: { staffId, date }
  });
  return response.data;
};