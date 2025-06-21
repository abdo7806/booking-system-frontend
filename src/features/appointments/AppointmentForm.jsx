import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormControl,
  FormHelperText,
  Typography,
  Paper,
  Divider,
  CircularProgress
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { arSA } from 'date-fns/locale';

// Redux Actions
import { addAppointment, changeAppointmentStatus } from './appointmentThunks';
import { fetchStaff } from '../staff/staffThunks';
import { fetchService } from '../service/serviceThunks';
import { getAllClients } from '../user/userThunks';

// API Functions
import { fetchAvailableTimes } from '../../api/appointmentApi';

export default function AvailabilityForm({ currentAppointment, onClose }) {
  // Redux Hooks
  const dispatch = useDispatch();
  const { list: staff, loading: staffLoading } = useSelector((state) => state.staff);
  const { list: service, loading: serviceLoading } = useSelector((state) => state.service);
  const { list: clients, loading: clientsLoading } = useSelector((state) => state.users);
  const { loading: appointmentLoading } = useSelector((state) => state.appointments);

  // State Management
  const [availableTimes, setAvailableTimes] = useState([]);
  const [disabledInput, setDisabledInput] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const [form, setForm] = useState({
    clientId: '',
    staffId: '',
    serviceId: '',
    date: null,
    startTime: '',
    status: 'Pending'
  });

  // Validation Rules
  const validateField = (name, value) => {
    switch (name) {
      case 'clientId':
        return value ? '' : 'يجب اختيار العميل';
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
      if (key !== 'status') {
        newErrors[key] = validateField(key, form[key]);
      }
    });
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  // Initialize Form with Current Appointment Data
  useEffect(() => {
    if (currentAppointment) {
      setForm({
        clientId: currentAppointment.clientId,
        staffId: currentAppointment.staffId,
        serviceId: currentAppointment.serviceId,
        date: new Date(currentAppointment.date),
        startTime: currentAppointment.startTime,
        status: currentAppointment.status || 'Pending'
      });
      setDisabledInput(true);
    }
  }, [currentAppointment]);

  // Fetch Initial Data
  useEffect(() => {
    dispatch(fetchStaff());
    dispatch(fetchService());
    dispatch(getAllClients());
  }, [dispatch]);

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

    if (currentAppointment) {
      dispatch(changeAppointmentStatus({ 
        id: currentAppointment.id, 
        status: form.status 
      }))
      .then(() => {
        alert('تم تعديل حالة الحجز بنجاح');
        onClose();
      });
    } else {
      dispatch(addAppointment(formattedForm))
        .unwrap()
        .then(() => {
          alert('تم الحجز بنجاح');
          onClose();
        })
        .catch((error) => {
          alert(error.message || 'فشل الحجز، تحقق من البيانات المدخلة');
        });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={arSA}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, width: { md: '600px' } }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
            {currentAppointment ? 'تعديل الحجز' : 'حجز جديد'}
          </Typography>
          
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            {/* Client Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth error={touched.clientId && !!errors.clientId} size="small">
                <InputLabel>اختر العميل *</InputLabel>
                <Select 
                  value={form.clientId} 
                  name="clientId" 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={disabledInput || clientsLoading}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300
                      }
                    }
                  }}
                >
                  {clientsLoading ? (
                    <MenuItem disabled>
                      <CircularProgress size={20} />
                    </MenuItem>
                  ) : (
                    clients.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.fullName} - {c.phone}
                      </MenuItem>
                    ))
                  )}
                </Select>
                {touched.clientId && errors.clientId && (
                  <FormHelperText>{errors.clientId}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* Staff Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth error={touched.staffId && !!errors.staffId} size="small">
                <InputLabel>اختر الموظف *</InputLabel>
                <Select 
                  value={form.staffId} 
                  name="staffId" 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={disabledInput || staffLoading}
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
              <FormControl fullWidth error={touched.serviceId && !!errors.serviceId} size="small">
                <InputLabel>اختر الخدمة *</InputLabel>
                <Select 
                  value={form.serviceId} 
                  name="serviceId" 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={disabledInput || serviceLoading}
                >
                  {serviceLoading ? (
                    <MenuItem disabled>
                      <CircularProgress size={20} />
                    </MenuItem>
                  ) : (
                    service.map((s) => (
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
                disabled={disabledInput}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    error={touched.date && !!errors.date}
                    helperText={touched.date && errors.date}
                  />
                )}
                disablePast
              />
            </Grid>

            {/* Time Selection */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={touched.startTime && !!errors.startTime} size="small">
                <InputLabel>الوقت المتاح *</InputLabel>
                <Select
                  name="startTime"
                  value={form.startTime}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!availableTimes.length || disabledInput}
                >
                  {availableTimes.length === 0 ? (
                    <MenuItem disabled>
                      لا توجد أوقات متاحة
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

            {/* Status Selection (Only for Existing Appointments) */}
            {disabledInput && (
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel>تغيير حالة الحجز</InputLabel>
                  <Select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <MenuItem value="Pending">قيد الانتظار</MenuItem>
                    <MenuItem value="Confirmed">مؤكد</MenuItem>
                    <MenuItem value="Completed">مكتمل</MenuItem>
                    <MenuItem value="Cancelled">ملغي</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>

          {/* Form Actions */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button 
              onClick={onClose} 
              variant="outlined"
              sx={{ minWidth: 100 }}
              disabled={appointmentLoading}
            >
              إلغاء
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              sx={{ minWidth: 100 }}
              disabled={appointmentLoading}
              startIcon={appointmentLoading ? <CircularProgress size={20} /> : null}
            >
              {currentAppointment ? 'حفظ' : 'حجز'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
}