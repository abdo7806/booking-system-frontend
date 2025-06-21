import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClients, removeUser } from '../user/userThunks';
import ClientForm from './ClientForm';
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

export default function ClientList() {
  const dispatch = useDispatch();
  const { list: clients, loading } = useSelector((state) => state.users);
  const [openForm, setOpenForm] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const drawerWidth = 240;
  
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    dispatch(getAllClients());
  }, [dispatch]);

  const handleDeleteConfirm = (clientId) => {
    setClientToDelete(clientId);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = () => {
    dispatch(removeUser(clientToDelete));
    setDeleteConfirmOpen(false);
  };

  const handleEdit = (client) => {
    setCurrentClient(client);
    setOpenForm(true);
  };

  const handleAdd = () => {
    setCurrentClient(null);
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
    setCurrentClient(null);
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
            Client Management
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<Add />}
            onClick={handleAdd}
            fullWidth={isMobile}
          >
            Add Client
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
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.id}</TableCell>
                    <TableCell>{client.fullName}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell align="center">
                      <IconButton 
                        color="primary" 
                        onClick={() => handleEdit(client)}
                        size={isMobile ? 'small' : 'medium'}
                      >
                        <Edit fontSize={isMobile ? 'small' : 'medium'} />
                      </IconButton>
                      <IconButton 
                        color="error" 
                        onClick={() => handleDeleteConfirm(client.id)}
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
            {currentClient ? 'Edit Client' : 'Add New Client'}
          </DialogTitle>
          <DialogContent>
            <ClientForm 
              currentClient={currentClient} 
              onClose={handleClose} 
            />
          </DialogContent>
        </Dialog>

        <ConfirmDialog
          open={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          onConfirm={handleDelete}
          title="Confirm Delete"
          content="Are you sure you want to delete this client? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
      </MainContent>
    </Box>
  );
}