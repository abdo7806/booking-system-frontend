import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAvailabilities,
  getAvailabilityById,
  createAvailability,
  updateAvailability,
  deleteAvailability,
  fetchAvailableTimes
} from '../../api/availabilityApi';

export const getAllAvailabilities = createAsyncThunk(
  'availability/fetchAll',
  fetchAvailabilities
);

export const getAvailability = createAsyncThunk(
  'availability/fetchOne',
  getAvailabilityById
);

export const addAvailability = createAsyncThunk(
  'availability/add',
  createAvailability
);

export const editAvailability = createAsyncThunk(
  'availability/edit',
  async ({ id, data }) => {
    return await updateAvailability(id, data);
  }
);

export const removeAvailability = createAsyncThunk(
  'availability/delete',
  deleteAvailability
);



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
