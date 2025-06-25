import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Grid,
  FormHelperText,
  Divider,
  Box
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { arSA } from 'date-fns/locale';

// Redux Actions
import { addAppointment } from '../appointments/appointmentThunks';
import { fetchStaff } from '../staff/staffThunks';
import { fetchService } from '../service/serviceThunks';

// API Functions
import { fetchAvailableTimes } from '../../api/appointmentApi';

// Context
import { useAuth } from '../../contexts/AuthContext';

export default function BookingModal({ 
  open, 
  onClose,
  initialServiceId = null 
}) {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { list: staff, loading: staffLoading } = useSelector((state) => state.staff);
  const { list: services, loading: servicesLoading } = useSelector((state) => state.service);
  const { loading: appointmentLoading } = useSelector((state) => state.appointments);

  const [availableTimes, setAvailableTimes] = useState([]);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const [form, setForm] = useState({
    clientId: user.id,
    staffId: '',
    serviceId: initialServiceId || '',
    date: null,
    startTime: '',
  });

  // Validation Rules
  const validateField = (name, value) => {
    switch (name) {
      case 'staffId':
        return value ? '' : 'يجب اختيار الموظف';
      case 'serviceId':
        return value ? '' : 'يجب اختيار الخدمة';
      case 'date':
        return value ? '' : 'يجب تحديد التاريخ';
      case 'startTime':
        return value ? '' : 'يجب تحديد الوقت';
      default:
        return '';
    }
  };

  // Validate Entire Form
  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      newErrors[key] = validateField(key, form[key]);
    });
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  // Fetch Initial Data
  useEffect(() => {
    dispatch(fetchStaff());
    dispatch(fetchService());
  }, [dispatch]);

  // Set initial service if provided
  useEffect(() => {
    if (initialServiceId) {
      setForm(prev => ({ ...prev, serviceId: initialServiceId }));
    }
  }, [initialServiceId]);

  // Fetch Available Times When Staff or Date Changes
  useEffect(() => {
    const { staffId, date } = form;
    
    if (staffId && date) {
      const formattedDate = date.toISOString().split('T')[0];
      fetchAvailableTimes(staffId, formattedDate)
        .then(setAvailableTimes)
        .catch(() => setAvailableTimes([]));
    } else {
      setAvailableTimes([]);
    }
  }, [form.staffId, form.date]);

  // Event Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleDateChange = (date) => {
    setForm(prev => ({ ...prev, date }));
    setTouched(prev => ({ ...prev, date: true }));
    setErrors(prev => ({ ...prev, date: validateField('date', date) }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const formattedForm = {
      ...form,
      date: form.date.toISOString().split('T')[0]
    };

    dispatch(addAppointment(formattedForm))
      .unwrap()
      .then(() => {
        alert('تم الحجز بنجاح');
        onClose();
      })
      .catch((error) => {
        alert(error.message || 'فشل الحجز، تحقق من البيانات المدخلة');
      });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={arSA}>
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3,
            width: '100%',
            maxWidth: '600px'
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center',
          fontWeight: 'bold',
          backgroundColor: (theme) => theme.palette.primary.main,
          color: '#fff',
          py: 2
        }}>
          حجز جديد
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="body1" color="text.secondary" mb={3}>
              يرجى تعبئة البيانات التالية لإتمام الحجز
            </Typography>

            <Grid container spacing={3}>
              {/* Staff Selection */}
              <Grid item xs={12}>
                <FormControl fullWidth error={touched.staffId && !!errors.staffId} size="medium">
                  <InputLabel>اختر الموظف *</InputLabel>
                  <Select 
                    value={form.staffId} 
                    name="staffId" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={staffLoading}
                    label="اختر الموظف *"
                  >
                    {staffLoading ? (
                      <MenuItem disabled>
                        <CircularProgress size={20} />
                      </MenuItem>
                    ) : (
                      staff.map((s) => (
                        <MenuItem key={s.id} value={s.id}>
                          {s.fullName} - {s.speciality}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                  {touched.staffId && errors.staffId && (
                    <FormHelperText>{errors.staffId}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* Service Selection */}
              <Grid item xs={12}>
                <FormControl fullWidth error={touched.serviceId && !!errors.serviceId} size="medium">
                  <InputLabel>اختر الخدمة *</InputLabel>
                  <Select 
                    value={form.serviceId} 
                    name="serviceId" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={servicesLoading || !!initialServiceId}
                    label="اختر الخدمة *"
                  >
                    {servicesLoading ? (
                      <MenuItem disabled>
                        <CircularProgress size={20} />
                      </MenuItem>
                    ) : (
                      services.map((s) => (
                        <MenuItem key={s.id} value={s.id}>
                          {s.name} - {s.duration} دقيقة - {s.price} ر.س
                        </MenuItem>
                      ))
                    )}
                  </Select>
                  {touched.serviceId && errors.serviceId && (
                    <FormHelperText>{errors.serviceId}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* Date Field */}
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="التاريخ *"
                  value={form.date}
                  onChange={handleDateChange}
                  disablePast
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={touched.date && !!errors.date}
                      helperText={touched.date && errors.date}
                    />
                  )}
                />
              </Grid>

              {/* Time Selection */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={touched.startTime && !!errors.startTime} size="medium">
                  <InputLabel>الوقت المتاح *</InputLabel>
                  <Select
                    name="startTime"
                    value={form.startTime}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={!availableTimes.length}
                    label="الوقت المتاح *"
                  >
                    {availableTimes.length === 0 ? (
                      <MenuItem disabled>
                        {form.date ? 'لا توجد أوقات متاحة' : 'اختر التاريخ أولاً'}
                      </MenuItem>
                    ) : (
                      availableTimes.map((t, i) => (
                        <MenuItem key={i} value={t}>
                          {t}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                  {touched.startTime && errors.startTime && (
                    <FormHelperText>{errors.startTime}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
          <Button 
            onClick={onClose} 
            variant="outlined"
            color="error"
            sx={{ minWidth: 100 }}
            disabled={appointmentLoading}
          >
            إلغاء
          </Button>
          <Button 
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            sx={{ minWidth: 120 }}
            disabled={appointmentLoading}
            startIcon={appointmentLoading ? <CircularProgress size={20} /> : null}
          >
            تأكيد الحجز
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}