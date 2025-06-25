
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointmentByClient } from '../appointments/appointmentThunks';
import AppointmentForm from '../appointments/AppointmentForm';

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
	styled
} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';

import { ConfirmDialog } from '../../components/ConfirmDialog';


// Context
import { useAuth } from '../../contexts/AuthContext';


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

export default function AppointmentList() {
	const dispatch = useDispatch();
	const { list: appointment, loading } = useSelector((state) => state.appointments);
	const [openForm, setOpenForm] = useState(false);
	const [currentAppointment, setcurrentAppointment] = useState(null);

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const drawerWidth = 240;
	
		const { user } = useAuth();
	

	useEffect(() => {
		dispatch(getAppointmentByClient(user.id));
		//console.log(appointment);
	}, [dispatch]);





	const handleEdit = (user) => {
		setcurrentAppointment(user);
		setOpenForm(true);
	};



	const handleClose = () => {
		setOpenForm(false);
		setcurrentAppointment(null);
	};

	


	return (
		<Box sx={{ display: 'flex' }}>
			
			<MainContent 
				open={!isMobile} 
				drawerWidth={drawerWidth}
				sx={{ 
					p: isMobile ? 1 : 3,
					width: `calc(100% - ${!isMobile ? drawerWidth : 0}px)`
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
						appointment Management
					</Typography>
			
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
									<TableCell>Id</TableCell>
									<TableCell>client Id</TableCell>
									<TableCell>client Name</TableCell>
									<TableCell>staff Id</TableCell>
									<TableCell>staff Name</TableCell>
									<TableCell>serviceId</TableCell>
									<TableCell>service Name</TableCell>
									<TableCell>date</TableCell>
									<TableCell>start Time</TableCell>
									<TableCell>end Time</TableCell>
									<TableCell>status</TableCell>
									<TableCell align="center">Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{appointment.map((s) => (
									
									<TableRow key={s.id}>
										<TableCell>{s.id}</TableCell>
										<TableCell>{s.clientId}</TableCell>
										<TableCell>{s.client.fullName}</TableCell>
										<TableCell>{s.staffId}</TableCell>
										<TableCell>{s.staff.fullName}</TableCell>
										<TableCell>{s.serviceId}</TableCell>
										<TableCell>{s.service.name}</TableCell>
										<TableCell>{s.date}</TableCell>
										<TableCell>{s.startTime}</TableCell>
										<TableCell>{s.endTime}</TableCell>
										<TableCell>{s.status}</TableCell>
										<TableCell align="center">
											<IconButton 
												color="primary" 
												onClick={() => handleEdit(s)}
												size={isMobile ? 'small' : 'medium'}
											>
												<Edit fontSize={isMobile ? 'small' : 'medium'} />
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
						{currentAppointment ? 'Edit Appointment' : 'Add New Appointment'}
					</DialogTitle>
					<DialogContent>
						<AppointmentForm 
							currentAppointment={currentAppointment} 
							onClose={handleClose} 
						/>
					</DialogContent>
				</Dialog>


			</MainContent>
		</Box>
	);
}

