import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
} from "@mui/material";
import {
  Home,
  CalendarToday,
  ListAlt,
  Person,
  ExitToApp,
} from "@mui/icons-material";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: theme.palette.primary.main,
}));

const NavLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
  alignItems: "center",
}));

const ClientNavbar = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ direction: "rtl" }}>
      <StyledToolbar>
        {/* الشعار */}
        <Typography
          variant="h6"
          component={Link}
          to="/dashboard"
          sx={{
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar src="/logo.png" sx={{ width: 32, height: 32 }} /> {/* اختياري */}
          صالون التجميل
        </Typography>

        {/* روابط التنقل */}
        <NavLinks>
          <Button
            component={Link}
            to="/client/dashboard"
            color="inherit"
            startIcon={<Home />}
            sx={{ fontWeight: "bold" }}
          >
            الرئيسية
          </Button>

          <Button
            component={Link}
            to="/client/create-appointment"
            color="inherit"
            startIcon={<CalendarToday />}
            sx={{ fontWeight: "bold" }}
          >
            حجز موعد
          </Button>

          <Button
            component={Link}
            to="/client/my-appointments"
            color="inherit"
            startIcon={<ListAlt />}
            sx={{ fontWeight: "bold" }}
          >
            مواعيدي
          </Button>
        </NavLinks>

        {/* قسم المستخدم (بروفايل + تسجيل خروج) */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar src={currentUser?.photoURL} alt="صورة المستخدم">
              {currentUser?.displayName?.charAt(0)}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              component={Link}
              to="/my-profile"
              onClick={handleMenuClose}
            >
              <Person sx={{ ml: 1 }} /> ملفي الشخصي
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ExitToApp sx={{ ml: 1 }} /> تسجيل الخروج
            </MenuItem>
          </Menu>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default ClientNavbar;