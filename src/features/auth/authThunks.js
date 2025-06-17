// src/features/auth/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as authApi from '../../api/authApi';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
		
    try {
			
      const data = await authApi.login({ email, password });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    try {
      const data = await authApi.register(userData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

