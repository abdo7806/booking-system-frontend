import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addService, updateService } from './serviceThunks';
import {
  Box,
  TextField,
  Button,

  Grid,
} from '@mui/material';

export default function ServiceForm({ currentService, onClose }) {
    

  const dispatch = useDispatch();
  const [form, setForm] = useState({ 
    name: '', 
    duration: 0, 
    price: 0, 
  });


  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentService) {
      setForm({
        name: currentService.name,
        duration: currentService.duration,
        price: currentService.price
      });
    }
  }, [currentService]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'name is required';
    if (form.duration < 10) {
      newErrors.duration = 'duration time 10 minutes';
    } 
    if (form.price < 1 ) {
      newErrors.price = 'Make sure to enter the price';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const serviceData = {
      name: form.name,
      duration: form.duration,
      price: form.price,
    };

    if (currentService) {
      dispatch(updateService({ id: currentService.id, data: serviceData }));
    } else {
      dispatch(addService(serviceData));
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
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Euration"
            name="duration"
            type="number"
            value={form.duration}
            onChange={handleChange}
            error={!!errors.duration}
            helperText={errors.duration}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            error={!!errors.price}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={onClose} sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          {currentService ? 'Update Service' : 'Add Service'}
        </Button>
      </Box>
    </Box>
  );
}