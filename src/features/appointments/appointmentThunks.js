import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAppointments,
  getAppointmentById,
  createAppointment,
  deleteAppointment,
  updateAppointmentStatus,
	fetchAvailableTimes,
  getAppointmentByClientId
} from '../../api/appointmentApi';

export const getAllAppointments = createAsyncThunk('appointments/fetchAll', fetchAppointments);
export const getAppointment = createAsyncThunk('appointments/getById', getAppointmentById);
export const addAppointment = createAsyncThunk('appointments/add', createAppointment);
export const removeAppointment = createAsyncThunk('appointments/delete', deleteAppointment);
export const changeAppointmentStatus = createAsyncThunk('appointments/status', updateAppointmentStatus);
export const getAppointmentByClient = createAsyncThunk('appointments/client', getAppointmentByClientId);

// جلب الأوقات المتاحة لموظف وتاريخ معين

export const getAvailableTimes = createAsyncThunk(
  'appointments/getAvailableTimes',
  async ({ staffId, date }, thunkAPI) => {
    try {
      return await fetchAvailableTimes(staffId, date);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error');
    }
  }
);
