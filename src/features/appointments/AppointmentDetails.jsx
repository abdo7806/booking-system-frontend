import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointment } from './appointmentThunks';

export default function AppointmentDetails({ id }) {
  const dispatch = useDispatch();
  const appointment = useSelector((state) =>
    state.appointments.list.find((a) => a.id === id)
  );

  useEffect(() => {
    if (!appointment) {
      dispatch(getAppointment(id));
    }
  }, [id, appointment, dispatch]);

  if (!appointment) return <p>جارٍ التحميل...</p>;

  return (
    <div>
      <h3>تفاصيل الموعد #{appointment.id}</h3>
      <p>Client ID: {appointment.clientId}</p>
      <p>Staff ID: {appointment.staffId}</p>
      <p>Service ID: {appointment.serviceId}</p>
      <p>Date: {appointment.date}</p>
      <p>Time: {appointment.startTime} - {appointment.endTime}</p>
      <p>Status: {appointment.status}</p>
    </div>
  );
}
