import React from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	Avatar,
	IconButton,
	Typography,
	Chip,
	Divider,
	Stack,
	Box
} from '@mui/material';
import {
	MoreVert as MoreVertIcon,
	AccessTime as TimeIcon,
	Person as ClientIcon,
	Phone as PhoneIcon,
	Spa as ServiceIcon,
	AttachMoney as PriceIcon
} from '@mui/icons-material';

const BookingCard = ({ booking }) => {
	const getStatusColor = (status) => {
		switch(status) {
			case 'مؤكدة': return 'success';
			case 'قيد الانتظار': return 'warning';
			case 'ملغية': return 'error';
			case 'منتهية': return 'info';
			default: return 'primary';
		}
	};

	return (
		<Card 
			sx={{ 
				maxWidth: 345,
				borderRadius: 2,
				boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
				transition: 'transform 0.3s',
				'&:hover': {
					transform: 'translateY(-5px)',
					boxShadow: '0 6px 24px rgba(0,0,0,0.12)'
				}
			}}
		>
			<CardHeader
				avatar={
					<Avatar 
						alt={booking.clientName} 
						src={booking.clientImage} 
						sx={{ bgcolor: '#ff6b81' }}
					>
						{booking.clientName.charAt(0)}
					</Avatar>
				}
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title={booking.clientName}
				subheader={
					<Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
						<PhoneIcon fontSize="small" sx={{ mr: 0.5 }} />
						{booking.clientPhone}
					</Box>
				}
			/>
			
			<CardContent>
				<Stack spacing={1.5}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<ServiceIcon color="action" sx={{ mr: 1 }} />
						<Typography variant="body2">
							{booking.serviceName} - {booking.duration} دقيقة
						</Typography>
					</Box>
					
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<TimeIcon color="action" sx={{ mr: 1 }} />
						<Typography variant="body2">
							{booking.date} - {booking.time}
						</Typography>
					</Box>
					
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<PriceIcon color="action" sx={{ mr: 1 }} />
						<Typography variant="body2" fontWeight="bold">
							{booking.price} ر.س
						</Typography>
					</Box>
				</Stack>
				
				<Divider sx={{ my: 2 }} />
				
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Chip 
						label={booking.status}
						color={getStatusColor(booking.status)}
						size="small"
						sx={{ fontWeight: 'bold' }}
					/>
					
					<Box sx={{ display: 'flex' }}>
						<IconButton size="small" color="primary">
							<ClientIcon fontSize="small" />
						</IconButton>
						<IconButton size="small" color="secondary">
							<PhoneIcon fontSize="small" />
						</IconButton>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
};

// مثال لاستخدام البطاقة
const exampleBooking = {
	clientName: "سارة أحمد",
	clientImage: "",
	clientPhone: "0501234567",
	serviceName: "تسريحة شعر كاملة",
	duration: 60,
	date: "15/06/2023",
	time: "02:30 م",
	price: 150,
	status: "مؤكدة"
};

export default function ExampleUsage() {
	return <BookingCard booking={exampleBooking} />;
}