import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchService } from '../service/serviceThunks';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Chip,
  styled,
  Avatar
} from '@mui/material';
import {
  CalendarToday,
  Spa, // أيقونة خدمات التجميل
  ContentCut, // أيقونة حلاقة
  Face, // أيقونة العناية بالبشرة
  Palette, // أيقونة التصميم
  LocalOffer // أيقونة العروض
} from '@mui/icons-material';

import  { useState } from 'react';

// ... (الاستيرادات الأخرى)
import BookingModal from './CreateAppointment';



// تنسيقات مخصصة للبطاقات الكبيرة بدون صور
const ServiceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  borderRadius: '16px',
  border: `2px solid ${theme.palette.primary.light}`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[10],
  },
}));

const ServiceIconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '180px',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
}));

const PriceChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
  fontWeight: 'bold',
  fontSize: '1.2rem',
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  height: 'auto',
}));

const DurationChip = styled(Chip)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  backgroundColor: theme.palette.success.light,
  color: theme.palette.success.contrastText,
  fontSize: '1rem',
  padding: theme.spacing(1),
}));

// دالة لاختيار أيقونة حسب نوع الخدمة
const getServiceIcon = (serviceName) => {
  const name = serviceName.toLowerCase();
  if (name.includes('حلاقة')) return <ContentCut fontSize="large" />;
  if (name.includes('عناية')) return <Face fontSize="large" />;
  if (name.includes('تجميل')) return <Spa fontSize="large" />;
  if (name.includes('تصميم')) return <Palette fontSize="large" />;
  return <LocalOffer fontSize="large" />;
};

export default function ClientDashboard() {
  const dispatch = useDispatch();
  const { list: services, loading } = useSelector((state) => state.service);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(fetchService());
  }, [dispatch]);




	const [modalOpen, setModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleBookClick = (serviceId) => {
    setSelectedServiceId(serviceId);
    setModalOpen(true);
  };

  const handleConfirmBooking = async (bookingData) => {
    setIsSubmitting(true);
    try {
      // هنا نرسل البيانات للسيرفر
      console.log('بيانات الحجز:', bookingData);
      // const response = await bookService(bookingData);
      
      // بعد نجاح الحجز:
      alert('تم الحجز بنجاح!');
      setModalOpen(false);
      navigate('/my-appointments'); // توجيه المستخدم لصفحة المواعيد
    } catch (error) {
      console.error('فشل الحجز:', error);
      alert('حدث خطأ أثناء الحجز: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Box sx={{ p: isMobile ? 2 : 4 }}>
      <Typography variant="h3" gutterBottom sx={{ 
        fontWeight: 'bold', 
        mb: 4,
        color: 'primary.main',
        textAlign: 'center'
      }}>
        خدماتنا المميزة
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress size={80} thickness={4} />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {services.map((service) => (
            <Grid item xs={12} md={6} lg={4} key={service.id}>
              <ServiceCard>
                <Box position="relative">
                  <PriceChip label={`${service.price} ر.س`} />
                  <ServiceIconWrapper>
                    <Avatar sx={{ 
                      width: 80, 
                      height: 80,
                      bgcolor: 'primary.dark'
                    }}>
                      {getServiceIcon(service.name)}
                    </Avatar>
                  </ServiceIconWrapper>
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 'bold',
                      color: 'primary.dark'
                    }}>
                      {service.name}
                    </Typography>
                    <DurationChip
                      label={`${service.duration} دقيقة`}
                    />
                  </Box>
                  <Typography variant="body1" sx={{ 
                    mb: 2,
                    color: 'text.secondary',
                    fontSize: '1.1rem'
                  }}>
                    {service.description || 'خدمة مميزة تقدم بأعلى معايير الجودة'}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 3, px: 3 }}>
                  <Button
                    variant="contained"
                    startIcon={<CalendarToday sx={{ fontSize: '1.5rem' }} />}
            onClick={() => handleBookClick(service.id)}
                    fullWidth
                    size="large"
                    sx={{
                      height: '56px',
                      fontSize: '1.2rem',
                      borderRadius: '12px',
                      bgcolor: 'secondary.main',
                      '&:hover': {
                        bgcolor: 'secondary.dark',
                      },
                    }}
                  >
                    احجز الآن
                  </Button>
 


									
                </CardActions>
              </ServiceCard>
            </Grid>
          ))}
        </Grid>
      )}
          {/* ✅ النافذة المنبثقة خارج الحلقة */}
    <BookingModal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      initialServiceId={selectedServiceId}
      onConfirm={handleConfirmBooking}
    />
    </Box>
  );
}