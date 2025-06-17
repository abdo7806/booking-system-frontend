// src/features/staff/staffSlice.js
import { createSlice } from '@reduxjs/toolkit';

import { fetchStaff, addStaff, updateStaff, deleteStaff } from './staffThunks';

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addStaff.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        const index = state.list.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s.id !== action.payload);
      });
  },
});

export default staffSlice.reducer;
