import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  styled,
  CssBaseline,
  CircularProgress,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  People as ClientsIcon,
  CalendarToday as AppointmentsIcon,
  AttachMoney as RevenueIcon,
  Spa as ServicesIcon,
  Star as RatingIcon,
  AccessTime as WaitingIcon
} from '@mui/icons-material';
import SalonNavbar from '../components/SalonNavbar';
import SalonSidebar from '../components/SalonSidebar';
import BookingCard from '../components/BookingCard';
import RecentAppointmentsTable from '../components/RecentAppointmentsTable';

// بطاقات مخصصة مع دعم RTL
const DashboardCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  textAlign: 'right',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
  '& .MuiSvgIcon-root': {
    marginLeft: theme.spacing(1),
  },
}));

const AdminDashboardPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [loading, setLoading] = useState(false);

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // إحصائيات لوحة التحكم
  const stats = [
    { title: 'إجمالي العملاء', value: '1,245', icon: <ClientsIcon />, color: theme.palette.primary.main },
    { title: 'الحجوزات اليوم', value: '28', icon: <AppointmentsIcon />, color: theme.palette.secondary.main },
    { title: 'الإيرادات الشهرية', value: '45,320 ر.س', icon: <RevenueIcon />, color: '#59a14f' },
    { title: 'الخدمات المتاحة', value: '24', icon: <ServicesIcon />, color: '#f28e2b' },
    { title: 'تقييم الصالون', value: '4.8/5', icon: <RatingIcon />, color: '#e15759' },
    { title: 'في قائمة الانتظار', value: '5', icon: <WaitingIcon />, color: '#76b7b2' }
  ];

  // بيانات الحجوزات
  const recentBookings = [
    {
      id: 1,
      client: 'أحمد محمد',
      service: 'قص شعر',
      date: '15 مايو 2023',
      time: '10:00 ص',
      status: 'مؤكدة',
      price: '120 ر.س'
    },
    {
      id: 2,
      client: 'سارة عبدالله',
      service: 'صبغة شعر',
      date: '15 مايو 2023',
      time: '11:30 ص',
      status: 'مكتملة',
      price: '250 ر.س'
    },
    {
      id: 3,
      client: 'فاطمة علي',
      service: 'مانيكير',
      date: '15 مايو 2023',
      time: '02:00 م',
      status: 'مؤكدة',
      price: '80 ر.س'
    },
    {
      id: 4,
      client: 'خالد أحمد',
      service: 'حلاقة لحية',
      date: '15 مايو 2023',
      time: '03:30 م',
      status: 'ملغية',
      price: '60 ر.س'
    },
    {
      id: 5,
      client: 'نورة سعد',
      service: 'تسريحة مناسبة',
      date: '15 مايو 2023',
      time: '04:00 م',
      status: 'مؤكدة',
      price: '150 ر.س'
    }
  ];

  return (
    <Box sx={{ display: 'flex', direction: 'rtl' }}>
      <CssBaseline />
      <SalonNavbar onMenuClick={handleDrawerToggle} />
      <SalonSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: isMobile ? 1 : isTablet ? 2 : 3,
          pt: '80px',
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh',
          width: '100%',
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(sidebarOpen && !isMobile && {
            width: `calc(100% - ${theme.drawerWidth}px)`,
            marginLeft: `${theme.drawerWidth}px`,
          }),
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <CircularProgress size={60} />
          </Box>
        ) : (
          <>
            {/* عنوان الصفحة */}
            <Typography 
              variant={isMobile ? 'h6' : isTablet ? 'h5' : 'h4'} 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                mb: isMobile ? 2 : 3,
                color: theme.palette.text.primary,
                fontFamily: 'Tajawal, sans-serif'
              }}
            >
              لوحة تحكم المدير
            </Typography>
            
            {/* بطاقات الإحصائيات */}
            <Grid container spacing={isMobile ? 1 : 2} sx={{ mb: isMobile ? 2 : 4 }}>
              {stats.map((stat, index) => (
                <Grid item xs={6} sm={4} md={4} lg={2} key={index}>
                  <DashboardCard>
                    <Box sx={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <Box>
                        <Typography 
                          variant={isMobile ? 'caption' : 'subtitle2'} 
                          sx={{ 
                            color: theme.palette.text.secondary,
                            mb: 0.5,
                            fontFamily: 'Tajawal, sans-serif'
                          }}
                        >
                          {stat.title}
                        </Typography>
                        <Typography 
                          variant={isMobile ? 'body1' : 'h5'} 
                          sx={{ 
                            fontWeight: 700,
                            color: stat.color,
                            fontFamily: 'Tajawal, sans-serif',
                            fontSize: isMobile ? '0.9rem' : '1.25rem'
                          }}
                        >
                          {stat.value}
                        </Typography>
                      </Box>
                      <Box sx={{ 
                        backgroundColor: `${stat.color}15`,
                        borderRadius: '50%',
                        width: isMobile ? 36 : 44,
                        height: isMobile ? 36 : 44,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {React.cloneElement(stat.icon, { 
                          sx: { 
                            color: stat.color,
                            fontSize: isMobile ? '1.2rem' : '1.5rem'
                          } 
                        })}
                      </Box>
                    </Box>
                  </DashboardCard>
                </Grid>
              ))}
            </Grid>
            
            {/* محتوى رئيسي */}
            <Grid container spacing={isMobile ? 1 : 2}>
              {/* جدول الحجوزات الحديثة */}
              <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
                <Paper sx={{ 
                  p: isMobile ? 1 : 2,
                  borderRadius: 2,
                  boxShadow: theme.shadows[1],
                  height: '100%'
                }}>
                  <Typography 
                    variant={isMobile ? 'subtitle1' : 'h6'} 
                    sx={{ 
                      fontWeight: 700,
                      mb: isMobile ? 1 : 2,
                      color: theme.palette.text.primary,
                      fontFamily: 'Tajawal, sans-serif'
                    }}
                  >
                    الحجوزات الحديثة
                  </Typography>
                  <RecentAppointmentsTable 
                    bookings={recentBookings} 
                    isMobile={isMobile} 
                    isTablet={isTablet}
                  />
                </Paper>
              </Grid>
              
              {/* الحجوزات القادمة */}
              <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
                <Paper sx={{ 
                  p: isMobile ? 1 : 2,
                  borderRadius: 2,
                  boxShadow: theme.shadows[1],
                  height: '100%',
                  mb: isMobile ? 2 : 0
                }}>
                  <Typography 
                    variant={isMobile ? 'subtitle1' : 'h6'} 
                    sx={{ 
                      fontWeight: 700,
                      mb: isMobile ? 1 : 2,
                      color: theme.palette.text.primary,
                      fontFamily: 'Tajawal, sans-serif'
                    }}
                  >
                    الحجوزات القادمة اليوم
                  </Typography>
                  <Box sx={{ 
                    maxHeight: isMobile ? 'none' : '500px',
                    overflowY: 'auto',
                    pr: 1,
                    '&::-webkit-scrollbar': {
                      width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: theme.palette.divider,
                      borderRadius: '3px',
                    }
                  }}>
                    {recentBookings
                      .filter(booking => booking.status === 'مؤكدة')
                      .slice(0, isMobile ? 2 : 4)
                      .map(booking => (
                        <Box key={booking.id} sx={{ mb: 2 }}>
                          <BookingCard 
                            booking={booking} 
                            isMobile={isMobile} 
                          />
                        </Box>
                      ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
};

export default AdminDashboardPage;