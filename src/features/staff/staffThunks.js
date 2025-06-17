import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/staffApi';
import { createUser, updateUser } from '../../api/userApi';

export const fetchStaff = createAsyncThunk(
  'staff/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await api.getAllStaff();
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Error fetching staff'
      );
    }
  }
);

export const addStaff = createAsyncThunk(
  'staff/add',
  async (data, thunkAPI) => {
    try {
      
      // 1. أولاً إنشاء المستخدم
      const userResponse = await createUser({
        fullName: data.fullName,
        email: data.email,
        role: data.role,
        password: data.password
      });

      if (userResponse.id < 0 ) {
        throw new Error('Failed to create user');
      }

    
      const user = userResponse;
    
      

      // 2. ثم إنشاء الموظف المرتبط بالمستخدم
      const staffResponse = await api.createStaff({
        userId: user.id,
        speciality: data.speciality
      });

      return staffResponse.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Error adding staff'
      );
    }
  }
);

export const updateStaff = createAsyncThunk(
  'staff/update',
  async ({ id, userId, data }, thunkAPI) => {
    try {
      // 1. أولاً تحديث بيانات المستخدم
      const userResponse = await updateUser(userId, {
        fullName: data.fullName,
        email: data.email,
        role: data.role,
        password: data.password
      });

     /* if (!userResponse.ok) {
        throw new Error('Failed to update user');
      }*/

      // 2. ثم تحديث بيانات الموظف
      const staffResponse = await api.updateStaff(id, {
        speciality: data.speciality
      });

      return staffResponse.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Error updating staff'
      );
    }
  }
);

export const deleteStaff = createAsyncThunk(
  'staff/delete',
  async ( id , thunkAPI) => {
    try {
     
      await api.deleteStaff(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Error deleting staff'
      );
    }
  }
);