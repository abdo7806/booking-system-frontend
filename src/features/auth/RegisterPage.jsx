import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from './authThunks';
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Link as MuiLink,
  InputAdornment,
  IconButton,
  Fade
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Validation Schema
const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase, one lowercase, one number and one special character'
    )
    .required('Password is required')
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: values => {
      dispatch(registerUser(values));
    }
  });

  return (
    <Container component="main" maxWidth="xs" sx={{ py: 8 }}>
      <Fade in={true} timeout={500}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 2,
            background: 'linear-gradient(to bottom, #ffffff, #f5f5f5)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4
          }}>
            <Typography component="h1" variant="h4" sx={{ 
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 1
            }}>
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Join our community today
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <TextField
              fullWidth
              id="fullName"
              name="fullName"
              label="Full Name"
              margin="normal"
              variant="outlined"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                }
              }}
            />

            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              margin="normal"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                }
              }}
            />

            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                }
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading || !formik.isValid}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                borderRadius: 1,
                fontSize: '1rem',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
                '&:hover': {
                  background: 'linear-gradient(to right, #3a7bd5 0%, #00d2ff 100%)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                }
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Register Now'
              )}
            </Button>

            <Box sx={{ 
              textAlign: 'center', 
              mt: 3,
              color: 'text.secondary'
            }}>
              <Typography variant="body2">
                Already have an account? {' '}
                <MuiLink 
                  component={Link} 
                  to="/" 
                  sx={{ 
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'primary.main'
                    }
                  }}
                >
                  Sign in
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
}