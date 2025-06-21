import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, editUser } from '../user/userThunks';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  FormHelperText
} from '@mui/material';

export default function ClientForm({ currentClient, onClose }) {
    
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
    role: 0, 
    password: '' 
  });

  const [disabledPassword, setdisabledPassword] = useState(false)

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentClient) {
      setForm({
        fullName: currentClient.fullName,
        email: currentClient.email,
        role: 0,
        password: ''
      });
      setdisabledPassword(true);
    }
  }, [currentClient]);

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!currentClient && !form.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const clientData = {
      fullName: form.fullName,
      email: form.email,
      role: form.role
    };

    if (form.password) {
      clientData.password = form.password;
    }
    if (currentClient) {
      dispatch(editUser({ id: currentClient.id, data: clientData }));
    } else {
      dispatch(addUser(clientData));
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
            helperText={errors.password || (currentClient ? 'Leave blank to keep current password' : '')}
            disabled={disabledPassword}
          />
        </Grid>
 
      </Grid>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={onClose} sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          {currentClient ? 'Update Client' : 'Add Client'}
        </Button>
      </Box>
    </Box>
  );
}