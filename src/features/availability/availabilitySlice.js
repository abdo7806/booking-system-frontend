import { createSlice } from '@reduxjs/toolkit';
import {
  getAllAvailabilities,
  addAvailability,
  editAvailability,
  removeAvailability,
} from './availabilityThunks';

const availabilitySlice = createSlice({
  name: 'availability',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAvailabilities.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAvailabilities.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(addAvailability.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editAvailability.fulfilled, (state, action) => {
        const index = state.list.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(removeAvailability.fulfilled, (state, action) => {
        state.list = state.list.filter((a) => a.id !== action.meta.arg);
      });
  },
});

export default availabilitySlice.reducer;
