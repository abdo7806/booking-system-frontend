import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addStaff, updateStaff } from './staffThunks';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';

export default function StaffForm({ currentStaff, onClose }) {
    
  const getRoleName = (role) => {
    switch(role) {
      case 'Client': return 0;
      case 'Staff': return 1;
      case 'Admin': return 2;
      default: return -1;
    }
  };
  const dispatch = useDispatch();
  const [form, setForm] = useState({ 
    fullName: '', 
    email: '', 
    role: 1, 
    password: '' ,
    speciality: ''
  });

  const [disabledPassword, setdisabledPassword] = useState(false)

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentStaff) {
      setForm({
        fullName: currentStaff.fullName,
        email: currentStaff.email,
        role: getRoleName(currentStaff.role),
        speciality: currentStaff.speciality,
        password: ''
      });
      setdisabledPassword(true);
    }
  }, [currentStaff]);

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!currentStaff && !form.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const userData = {
      fullName: form.fullName,
      email: form.email,
      role: form.role,
      speciality: form.speciality
    };

    if (form.password) {
      userData.password = form.password;
    }
    if (currentStaff) {
      dispatch(updateStaff({ id: currentStaff.id, userId: currentStaff.userId,  data: userData }));
    } else {
      dispatch(addStaff(userData));
    }
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };



  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            error={!!errors.fullName}
            helperText={errors.fullName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password || (currentStaff ? 'Leave blank to keep current password' : '')}
            disabled={disabledPassword}
          />
        </Grid>
    

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Speciality"
            name="speciality"
            type="text"
            value={form.speciality}
            onChange={handleChange}
            error={!!errors.password}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={onClose} sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          {currentStaff ? 'Update User' : 'Add User'}
        </Button>
      </Box>
    </Box>
  );
}