import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStaff, deleteStaff } from './staffThunks';
import StaffForm from './StaffForm';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  useTheme,
  useMediaQuery,
  CssBaseline,
  Drawer,
  Toolbar,
  styled
} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import SalonNavbar from '../../components/SalonNavbar';
import SalonSidebar from '../../components/SalonSidebar';
import { ConfirmDialog } from '../../components/ConfirmDialog';

// التنسيق للصفحة الرئيسية مع الشريط الجانبي
const MainContent = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, drawerWidth }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function StaffList() {
  const dispatch = useDispatch();
  const { list: staff, loading } = useSelector((state) => state.staff);
  const [openForm, setOpenForm] = useState(false);
  const [currentStaff, setcurrentStaff] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const drawerWidth = 240;
  
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  const handleDeleteConfirm = (id) => {
 
    setUserToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = () => {
    dispatch(deleteStaff(userToDelete));
    setDeleteConfirmOpen(false);
  };

  const handleEdit = (user) => {
    setcurrentStaff(user);
    setOpenForm(true);
  };

  const handleAdd = () => {
    setcurrentStaff(null);
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
    setcurrentStaff(null);
  };

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SalonNavbar 
        onMenuClick={handleDrawerToggle} 
        drawerWidth={drawerWidth}
        sidebarOpen={sidebarOpen}
      />
      
      <SalonSidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        drawerWidth={drawerWidth}
      />
      
      <MainContent 
        open={sidebarOpen} 
        drawerWidth={drawerWidth}
        sx={{ 
          p: isMobile ? 1 : 3,
          width: `calc(100% - ${sidebarOpen ? drawerWidth : 0}px)`
        }}
      >
        <DrawerHeader />
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3,
          flexDirection: isMobile ? 'column' : 'row',
          gap: 2
        }}>
          <Typography variant="h4" component="h1">
            staff Management
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<Add />}
            onClick={handleAdd}
            fullWidth={isMobile}
          >
            staff User
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer 
            component={Paper}
            sx={{
              maxWidth: '100%',
              overflowX: 'auto'
            }}
          >
            <Table size={isMobile ? 'small' : 'medium'}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>userId</TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>speciality</TableCell>
                  <TableCell>createdAt</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staff.map((s) => (
                  
                  <TableRow key={s.id}>
                    <TableCell>{s.id}</TableCell>
                    <TableCell>{s.userId}</TableCell>
                    <TableCell>{s.fullName}</TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell>{s.speciality}</TableCell>
                    <TableCell>{s.createdAt}</TableCell>
                    <TableCell align="center">
                      <IconButton 
                        color="primary" 
                        onClick={() => handleEdit(s)}
                        size={isMobile ? 'small' : 'medium'}
                      >
                        <Edit fontSize={isMobile ? 'small' : 'medium'} />
                      </IconButton>
                      <IconButton 
                        color="error" 
                        onClick={() => handleDeleteConfirm(s.id)}
                        size={isMobile ? 'small' : 'medium'}
                      >
                        <Delete fontSize={isMobile ? 'small' : 'medium'} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Dialog open={openForm} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            {currentStaff ? 'Edit User' : 'Add New User'}
          </DialogTitle>
          <DialogContent>
            <StaffForm 
              currentStaff={currentStaff} 
              onClose={handleClose} 
            />
          </DialogContent>
        </Dialog>

        <ConfirmDialog
          open={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          onConfirm={handleDelete}
          title="Confirm Delete"
          content="Are you sure you want to delete this user? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
      </MainContent>
    </Box>
  );
}