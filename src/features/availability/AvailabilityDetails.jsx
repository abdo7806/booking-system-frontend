import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAvailability } from './availabilityThunks';

export default function AvailabilityDetails({ id }) {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.availability.list.find(a => a.id === id));

  useEffect(() => {
    if (!item) dispatch(getAvailability(id));
  }, [id, dispatch, item]);

  if (!item) return <p>Loading...</p>;

  return (
    <div>
      <h3>Availability #{item.id}</h3>
      <p>Staff: {item.staffId}</p>
      <p>Day: {item.day}</p>
      <p>Time: {item.startTime} - {item.endTime}</p>
    </div>
  );
}
