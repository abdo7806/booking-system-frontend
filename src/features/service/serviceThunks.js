import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/serviceApi';

export const fetchService = createAsyncThunk(
  'service/fetchAll',
  async (_, thunkAPI) => {
    try {
      
      const res = await api.getAllService();
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Error fetching service'
      );
    }
  }
);

export const addService = createAsyncThunk(
  'service/add',
  async (data, thunkAPI) => {
    try {
      
const serviceResponse = await api.createService(data);

  
      return serviceResponse.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Error adding service'
      );
    }
  }
);

export const updateService = createAsyncThunk(
  'service/update',
  async ({ id, data }, thunkAPI) => {
    try {
 
      const serviceResponse = await api.updateService(id, data);

      return serviceResponse.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Error updating service'
      );
    }
  }
);

export const deleteService = createAsyncThunk(
  'service/delete',
  async ( id , thunkAPI) => {
    try {
     
      await api.deleteService(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Error deleting service'
      );
    }
  }
);