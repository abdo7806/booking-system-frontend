import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './authThunks';
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext'; // تأكد من المسار الصحيح

// Validation Schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email('البريد الإلكتروني غير صالح')
    .required('البريد الإلكتروني مطلوب'),
  password: Yup.string()
    .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل')
    .required('كلمة المرور مطلوبة')
});

export default function LoginPage({ email = "", password = "" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const { login } = useAuth();

  const { loading, error, user } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { 
      email: email,
      password: password 
    },
    validationSchema,
    onSubmit: values => {
      dispatch(loginUser(values));
    }
  });

  useEffect(() => {
    if (user != null) {
      // التوجيه حسب الدور
      if (user.role === "Admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "Client") {
        navigate("/dashboard");
      } else {
        navigate("/"); // دور غير معروف
      }
   
      login(user);
    }
  }, [user, navigate]);

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
              تسجيل الدخول
            </Typography>
            <Typography variant="body2" color="text.secondary">
              الرجاء إدخال بيانات الاعتماد الخاصة بك
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
              id="email"
              name="email"
              label="البريد الإلكتروني"
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
              label="كلمة المرور"
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
                background: 'linear-gradient(to right, #3a7bd5 0%, #00d2ff 100%)',
                '&:hover': {
                  background: 'linear-gradient(to right, #00c6ff 0%, #0072ff 100%)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                }
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'تسجيل الدخول'
              )}
            </Button>

            <Box sx={{ 
              textAlign: 'center', 
              mt: 3,
              color: 'text.secondary'
            }}>
              <Typography variant="body2">
                ليس لديك حساب؟ {' '}
                <MuiLink 
                  component={Link} 
                  to="/register" 
                  sx={{ 
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'primary.main'
                    }
                  }}
                >
                  إنشاء حساب جديد
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
}