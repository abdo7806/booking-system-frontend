import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  fetchClients
} from '../../api/userApi';

export const getAllUsers = createAsyncThunk('users/fetchAll', fetchUsers);

// ارجاع كل العملاء
export const getAllClients = createAsyncThunk('users/fetchAllClients', fetchClients);

export const getUser = createAsyncThunk('users/getById', getUserById);


export const addUser = createAsyncThunk('users/add', createUser);

export const editUser = createAsyncThunk(
  'users/edit',
  async ({ id, data }) => {
    return await updateUser(id, data);
  }
);

export const removeUser = createAsyncThunk('users/delete', deleteUser);
