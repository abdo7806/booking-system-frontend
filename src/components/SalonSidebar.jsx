import React from 'react';
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
	Link as MuiLink
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  CalendarToday as AppointmentsIcon,
  People as ClientsIcon,
  Spa as ServicesIcon,
  AttachMoney as PaymentsIcon,
  Inventory as ProductsIcon,
  Assessment as ReportsIcon,
  Store as SalonIcon,
  Logout as LogoutIcon,
	
} from '@mui/icons-material';

import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

// routes
import { useNavigate, Link } from "react-router-dom";
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
    direction: 'rtl' // هذا يضمن أن النص يبدأ من اليمين
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
    marginRight: theme.spacing(1), // تعديل المسافة بين النص والأيقونة
  },
}));

const SalonSidebar = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const menuItems = [
    { text: 'لوحة التحكم', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'الحجوزات', icon: <AppointmentsIcon />, path: '/admin/appointments' },
    { text: 'اوقات التوفر', icon: <WorkOutlineIcon />, path: '/admin/availability' },
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

  return (
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
        borderBottom: `1px solid ${theme.palette.sidebar.divider}`
      }}>
        <SalonIcon sx={{ 
          fontSize: 50, 
          color: theme.palette.primary.main,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
        }} />
        <Typography variant="h6" sx={{ 
          mt: 1, 
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
															sx={{ 
																textDecoration: 'none',
															}}
														>
												
          <RtlListItem 
            button 
            key={item.text}
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
                borderRight: 'none',
                borderLeft: `4px solid ${theme.palette.primary.main}`, // تغيير الحد إلى اليسار
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
            alt="مدير النظام" 
            src="/path/to/admin.jpg" 
            sx={{ 
              width: 40, 
              height: 40, 
              ml: 1,
              border: `2px solid ${theme.palette.primary.light}`
            }}
          />
          <Box sx={{ textAlign: 'right', flexGrow: 1 }}>
            <Typography 
              variant="body2"
              sx={{ fontFamily: 'Tajawal, sans-serif' }}
            >
              مدير النظام
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: theme.palette.sidebar.secondaryText,
                fontFamily: 'Tajawal, sans-serif'
              }}
            >
              admin@example.com
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
  );
};

export default SalonSidebar;