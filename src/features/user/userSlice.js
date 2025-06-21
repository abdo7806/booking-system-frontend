

import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers, addUser, editUser, removeUser, getAllClients } from './userThunks';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        
        state.loading = false;
        state.list = action.payload;
        console.log("status",state)
      })
        .addCase(getAllClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllClients.fulfilled, (state, action) => {
        
        state.loading = false;
        state.list = action.payload;
        console.log("status",state)
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.list.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.meta.arg);
      });
  },
});

export default userSlice.reducer;
