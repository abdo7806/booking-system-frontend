import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Avatar,
  Typography,
  useTheme,
  useMediaQuery,
  styled,
  Link as MuiLink,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  CalendarToday as AppointmentsIcon,
  People as ClientsIcon,
  Spa as ServicesIcon,
  Assessment as ReportsIcon,
  Logout as LogoutIcon,
  WorkOutline as AvailabilityIcon,
    Store as SalonIcon,

} from '@mui/icons-material';

// Context
import { useAuth } from '../contexts/AuthContext';

// Routes
import { useNavigate, Link } from "react-router-dom";

// Styled Components
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: theme.drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    width: theme.drawerWidth,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: theme.palette.sidebar.background,
    color: theme.palette.sidebar.text,
    direction: 'rtl'
  },
  '& .MuiDrawer-paper::-webkit-scrollbar': {
    width: '0.4em',
  },
  '& .MuiDrawer-paper::-webkit-scrollbar-track': {
    background: theme.palette.sidebar.scrollTrack,
  },
  '& .MuiDrawer-paper::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.sidebar.scrollThumb,
    borderRadius: '4px',
  },
}));

const RtlListItem = styled(ListItem)(({ theme }) => ({
  '& .MuiListItemText-root': {
    marginRight: theme.spacing(1),
  },
}));

const SalonSidebar = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { text: 'لوحة التحكم', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'الحجوزات', icon: <AppointmentsIcon />, path: '/admin/appointments' },
    { text: 'أوقات التوفر', icon: <AvailabilityIcon />, path: '/admin/availability' },
    { text: 'العملاء', icon: <ClientsIcon />, path: '/admin/clients' },
    { text: 'الخدمات', icon: <ServicesIcon />, path: '/admin/services' },
    { text: 'طاقم العمل', icon: <ClientsIcon />, path: '/admin/staff' },
    { text: 'المستخدمون', icon: <ClientsIcon />, path: '/admin/users' },
    { text: 'التقارير', icon: <ReportsIcon />, path: '/reports' },
  ];

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    if (isMobile) onClose();
  };

  const handleLogoutClick = () => {
    setLogoutConfirmOpen(true);
  };

  const handleConfirmLogout = () => {
    logout();
    //navigate('/login');
    navigate('/');
    setLogoutConfirmOpen(false);
  };

  const handleCancelLogout = () => {
    setLogoutConfirmOpen(false);
  };

  return (
    <>
      <StyledDrawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
       
      >
        
        {/* رأس الشريط الجانبي */}
        <Box sx={{ 
          p: 3, 
          textAlign: 'center',
          borderBottom: `1px solid ${theme.palette.sidebar.divider}`,
          marginTop:"40px"
        }}>
       
        <SalonIcon sx={{ 
          fontSize: 50, 
          color: theme.palette.primary.main,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
        }} />
        
            <Typography variant="h5">ش</Typography>
          <Typography variant="h6" sx={{ 
            fontWeight: 'bold',
            fontFamily: 'Tajawal, sans-serif'
          }}>
            صالون الجمال
          </Typography>
          <Typography variant="caption" sx={{ 
            color: theme.palette.sidebar.secondaryText,
            fontFamily: 'Tajawal, sans-serif'
          }}>
            نظام إدارة الحجوزات
          </Typography>
        </Box>
        
        <Divider sx={{ backgroundColor: theme.palette.sidebar.divider }} />
        
        {/* قائمة العناصر */}
        <List sx={{ py: 0, direction: 'rtl' }}>
          {menuItems.map((item, index) => (
            <MuiLink 
              component={Link} 
              to={item.path} 
              key={item.text}
              sx={{ textDecoration: 'none' }}
            >
              <RtlListItem 
                button
                selected={selectedIndex === index}
                onClick={() => handleListItemClick(index)}
                sx={{
                  py: 1.5,
                  px: 3,
                  '&:hover': {
                    backgroundColor: theme.palette.sidebar.hoverBg,
                  },
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.sidebar.activeBg,
                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                    '&:hover': {
                      backgroundColor: theme.palette.sidebar.activeBg,
                    },
                  },
                }}
              >
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    fontFamily: 'Tajawal, sans-serif',
                    fontWeight: selectedIndex === index ? 'bold' : 'normal'
                  }} 
                />
                <ListItemIcon sx={{
                  minWidth: 'auto',
                  color: selectedIndex === index ? 
                    theme.palette.primary.main : 
                    'inherit'
                }}>
                  {item.icon}
                </ListItemIcon>
              </RtlListItem>
            </MuiLink>
          ))}
        </List>
        
        <Divider sx={{ backgroundColor: theme.palette.sidebar.divider }} />
        
        {/* قسم المستخدم */}
        <Box sx={{ 
          p: 2, 
          mt: 'auto',
          backgroundColor: theme.palette.sidebar.footerBg,
          borderTop: `1px solid ${theme.palette.sidebar.divider}`,
          direction: 'rtl'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar 
              alt={user?.fullName} 
              src={user?.avatar}
              sx={{ 
                width: 40, 
                height: 40, 
                ml: 1,
                bgcolor: theme.palette.primary.main
              }}
            >
              {user?.fullName?.charAt(0)}
            </Avatar>
            <Box sx={{ textAlign: 'right', flexGrow: 1 }}>
              <Typography 
                variant="body2"
                sx={{ fontFamily: 'Tajawal, sans-serif' }}
              >
                {user?.fullName || 'مستخدم'}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: theme.palette.sidebar.secondaryText,
                  fontFamily: 'Tajawal, sans-serif',
                  display: 'block'
                }}
              >
                {user?.role}
              </Typography>
            </Box>
          </Box>
          
          <RtlListItem 
            button
            sx={{
              borderRadius: 1,
              '&:hover': {
                backgroundColor: theme.palette.sidebar.hoverBg,
              }
            }}
            onClick={handleLogoutClick}
          >
            <ListItemText 
              primary="تسجيل الخروج" 
              primaryTypographyProps={{
                color: theme.palette.error.main,
                fontFamily: 'Tajawal, sans-serif'
              }} 
            />
            <ListItemIcon sx={{ color: theme.palette.error.main, minWidth: 'auto' }}>
              <LogoutIcon />
            </ListItemIcon>
          </RtlListItem>
        </Box>
      </StyledDrawer>

      {/* نافذة تأكيد الخروج */}
      <Dialog
        open={logoutConfirmOpen}
        onClose={handleCancelLogout}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir="rtl"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontFamily: 'Tajawal, sans-serif' }}>
          تأكيد تسجيل الخروج
        </DialogTitle>
        <DialogContent>
          <DialogContentText 
            id="alert-dialog-description"
            sx={{ fontFamily: 'Tajawal, sans-serif' }}
          >
            هل أنت متأكد أنك تريد تسجيل الخروج من النظام؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCancelLogout}
            sx={{ fontFamily: 'Tajawal, sans-serif' }}
          >
            إلغاء
          </Button>
          <Button 
            onClick={handleConfirmLogout} 
            autoFocus
            color="error"
            variant="contained"
            sx={{ fontFamily: 'Tajawal, sans-serif' }}
          >
            تسجيل الخروج
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SalonSidebar;