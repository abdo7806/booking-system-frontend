import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Box,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const RecentAppointmentsTable = ({ bookings }) => {
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }} aria-label="recent appointments table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
            <TableCell sx={{ fontWeight: 'bold', minWidth: '100' }}>العميل</TableCell>
            <TableCell sx={{ fontWeight: 'bold', minWidth: '80' }}>الخدمة</TableCell>
            <TableCell sx={{ fontWeight: 'bold', minWidth: '70' }}>التاريخ</TableCell>
            <TableCell sx={{ fontWeight: 'bold', minWidth: '100' }}>الحالة</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>السعر</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <StyledTableRow key={booking.id}>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    alt={booking.clientName} 
                    src={booking.clientImage} 
                    sx={{ width: 32, height: 32, mr: 2 }}
                  />
                  {booking.clientName}
                </Box>
              </TableCell>
              <TableCell>{booking.service}</TableCell>
              <TableCell>
                {booking.date} - {booking.time}
              </TableCell>
              <TableCell>
                <Chip 
                  label={booking.status}
                  color={
                    booking.status === 'مؤكدة' ? 'success' :
                    booking.status === 'قيد الانتظار' ? 'warning' :
                    booking.status === 'ملغية' ? 'error' : 'default'
                  }
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {booking.price} ر.س
                </Typography>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecentAppointmentsTable;