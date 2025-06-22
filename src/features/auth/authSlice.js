// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './authThunks';

// context
import { useAuth } from '../../contexts/AuthContext'; // تأكد من المسار الصحيح

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
	initialState: initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {

        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
				state.error = "تم التسجيل بنجاح"
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(state.user));

      // const { login } = useAuth();

          // login(action.payload.user); // تسجيل الدخول


     // localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

			
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
