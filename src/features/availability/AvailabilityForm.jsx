import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAvailability, editAvailability } from './availabilityThunks';
import { fetchStaff } from '../staff/staffThunks';
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
} from '@mui/material';

export default function AvailabilityForm({ currentAvailability, onClose }) {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        staffId: -1,
        dayOfWeek: 0,
        startTime: '',
        endTime: '',
    });

    const { list: staff } = useSelector((state) => state.staff);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (currentAvailability) {
            setForm({
                staffId: currentAvailability.staffId,
                dayOfWeek: currentAvailability.dayOfWeek,
                startTime: currentAvailability.startTime,
                endTime: currentAvailability.endTime
            });
        } else {
            dispatch(fetchStaff());
        }
    }, [currentAvailability, dispatch]);

    const validate = () => {
        const newErrors = {};
        if (form.staffId === -1) newErrors.staffId = 'الرجاء اختيار موظف';
        if (!form.startTime.trim()) newErrors.startTime = 'الرجاء اختيار وقت البدء';
        if (!form.endTime.trim()) newErrors.endTime = 'الرجاء اختيار وقت الانتهاء';
        if (form.startTime >= form.endTime) newErrors.endTime = 'يجب أن يكون وقت الانتهاء بعد وقت البدء';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const availabilityData = {
            staffId: form.staffId,
            dayOfWeek: form.dayOfWeek,
            startTime: form.startTime,
            endTime: form.endTime
        };

        if (currentAvailability) {
            dispatch(editAvailability({ id: currentAvailability.id, data: availabilityData }));
        } else {
            dispatch(addAvailability(availabilityData));
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
                    <FormControl fullWidth error={!!errors.staffId}>
                        <InputLabel>اختر الموظف</InputLabel>
                        <Select 
                            value={form.staffId} 
                            name="staffId" 
                            onChange={handleChange}
                        >
                            {staff.map((s) => (
                                <MenuItem key={s.id} value={s.id}>{s.fullName}</MenuItem>
                            ))}
                        </Select>
                        {errors.staffId && <FormHelperText>{errors.staffId}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>اختر يومًا</InputLabel>
                        <Select 
                            value={form.dayOfWeek} 
                            name="dayOfWeek" 
                            onChange={handleChange}
                        >
                            <MenuItem value={6}>السبت</MenuItem>
                            <MenuItem value={0}>الأحد</MenuItem>
                            <MenuItem value={1}>الإثنين</MenuItem>
                            <MenuItem value={2}>الثلاثاء</MenuItem>
                            <MenuItem value={3}>الأربعاء</MenuItem>
                            <MenuItem value={4}>الخميس</MenuItem>
                            <MenuItem value={5}>الجمعة</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="وقت البدء"
                        name="startTime"
                        type="time"
                        value={form.startTime}
                        onChange={handleChange}
                        error={!!errors.startTime}
                        helperText={errors.startTime}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="وقت الانتهاء"
                        name="endTime"
                        type="time"
                        value={form.endTime}
                        onChange={handleChange}
                        error={!!errors.endTime}
                        helperText={errors.endTime}
                    />
                </Grid>
            </Grid>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={onClose} sx={{ mr: 2 }}>
                    إلغاء
                </Button>
                <Button type="submit" variant="contained">
                    {currentAvailability ? 'تحديث التوفر' : 'إضافة التوفر'}
                </Button>
            </Box>
        </Box>
    );
}