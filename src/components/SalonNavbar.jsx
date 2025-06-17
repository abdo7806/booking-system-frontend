import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Box,
  useTheme,
  useMediaQuery,
  styled
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Email as EmailIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const RtlMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    minWidth: 200,
    borderRadius: 12,
    boxShadow: theme.shadows[4],
    direction: 'rtl',
    textAlign: 'right',
  },
}));

const ProfileMenuItem = styled(MenuItem)(({ theme }) => ({
  direction: 'rtl',
  padding: theme.spacing(1.5, 2),
  '& .MuiSvgIcon-root': {
    marginLeft: theme.spacing(1.5),
    color: theme.palette.text.secondary,
  },
}));

const SalonNavbar = ({ onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
        direction: 'rtl'
      }}
    >
      <Toolbar sx={{ 
        px: isMobile ? 2 : 3,
        minHeight: '64px !important'
      }}>

        
        {/* أيقونات التنبيهات */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 0.5,
          ml: 1
        }}>
          <IconButton 
            color="inherit" 
            sx={{ 
              color: theme.palette.text.secondary,
              p: 1
            }}
          >
            <Badge badgeContent={4} color="error" overlap="circular">
              <EmailIcon fontSize={isMobile ? "small" : "medium"} />
            </Badge>
          </IconButton>
          
          <IconButton 
            color="inherit" 
            sx={{ 
              color: theme.palette.text.secondary,
              p: 1
            }}
          >
            <Badge badgeContent={3} color="error" overlap="circular">
              <NotificationsIcon fontSize={isMobile ? "small" : "medium"} />
            </Badge>
          </IconButton>
          
          {/* زر الملف الشخصي */}
          <IconButton
            onClick={handleProfileMenuOpen}
            color="inherit"
            sx={{ 
              p: 0.5,
              ml: 1
            }}
          >
            <Avatar 
              alt="صورة المستخدم" 
              src="/path/to/profile.jpg" 
              sx={{ 
                width: 36, 
                height: 36,
                border: `2px solid ${theme.palette.primary.light}`
              }}
            />
          </IconButton>
        </Box>
        
        {/* قائمة الملف الشخصي */}
        <RtlMenu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <Box sx={{ py: 1, px: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">مدير النظام</Typography>
            <Typography variant="caption" color="text.secondary">admin@example.com</Typography>
          </Box>
          <Divider />
          
          <ProfileMenuItem onClick={handleMenuClose}>
            <AccountCircleIcon />
            <Typography variant="body2">الملف الشخصي</Typography>
          </ProfileMenuItem>
          
          <ProfileMenuItem onClick={handleMenuClose}>
            <SettingsIcon />
            <Typography variant="body2">الإعدادات</Typography>
          </ProfileMenuItem>
          
          <Divider />
          
          <ProfileMenuItem onClick={handleMenuClose}>
            <LogoutIcon sx={{ color: theme.palette.error.main }} />
            <Typography variant="body2" color="error">تسجيل الخروج</Typography>
          </ProfileMenuItem>
        </RtlMenu>
				

        {/* عنوان الصالون */}
        <Typography 
          variant="h6"
          noWrap 
          component="div"
          sx={{ 
            flexGrow: 1,
            fontWeight: 700,
            color: theme.palette.primary.main,
            fontFamily: 'Tajawal, sans-serif',
            fontSize: isMobile ? '1.1rem' : '1.25rem'
          }}
        >
          صالون الجمال
        </Typography>

				 {/* زر القائمة الجانبية */}
        <IconButton
          color="inherit"
          onClick={onMenuClick}
          edge="start"
          sx={{ 
            color: theme.palette.primary.main,
            display: { xs: 'none', md: 'flex' },
            ml: 1
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* زر القائمة للجوال */}
      </Toolbar>
    </AppBar>
  );
};

export default SalonNavbar;