import { createSlice } from '@reduxjs/toolkit';
import {
  getAllAppointments,
  addAppointment,
  removeAppointment,
  changeAppointmentStatus,
} from './appointmentThunks';

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(removeAppointment.fulfilled, (state, action) => {
        state.list = state.list.filter(a => a.id !== action.meta.arg);
      })
      .addCase(changeAppointmentStatus.fulfilled, (state, action) => {
        const index = state.list.findIndex(a => a.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      });
  },
});

export default appointmentSlice.reducer;
