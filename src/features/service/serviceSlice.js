// src/features/Service/ServiceSlice.js
import { createSlice } from '@reduxjs/toolkit';

import { fetchService, addService, updateService, deleteService } from './serviceThunks';

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchService.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchService.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addService.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateService.fulfilled, (state, action) => {
        const index = state.list.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s.id !== action.payload);
      });
  },
});

export default serviceSlice.reducer;
