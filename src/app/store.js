import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice';
import staffReducer from '../features/staff/staffSlice';
import userReducer from '../features/user/userSlice';
import serviceReducer from '../features/service/serviceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    staff: staffReducer,
    users: userReducer,
    service: serviceReducer

  },
});