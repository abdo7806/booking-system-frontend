import React, { useState } from 'react';
import SalonNavbar from './SalonNavbar';
import SalonSidebar from './SalonSidebar';
import BookingCard from './BookingCard';
import { Box, CssBaseline } from '@mui/material';

const SalonLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SalonNavbar onMenuClick={handleDrawerToggle} />
      <SalonSidebar open={sidebarOpen} onClose={handleDrawerToggle} />
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          marginTop: '64px',
          backgroundColor: '#f5f7fa',
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 3,
          padding: 2
        }}>
          {/* استخدام بطاقات الحجوزات */}
          <BookingCard booking={{
            clientName: "سارة أحمد",
            clientPhone: "0501234567",
            serviceName: "تسريحة شعر كاملة",
            duration: 60,
            date: "15/06/2023",
            time: "02:30 م",
            price: 150,
            status: "مؤكدة"
          }} />
          
          <BookingCard booking={{
            clientName: "نورا محمد",
            clientPhone: "0559876543",
            serviceName: "مانيكير",
            duration: 30,
            date: "15/06/2023",
            time: "04:00 م",
            price: 80,
            status: "قيد الانتظار"
          }} />
        </Box>
      </Box>
    </Box>
  );
};

export default SalonLayout;