import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../user/userThunks';

export default function UserDetails({ userId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) =>
    state.users.list.find((u) => u.id === userId)
  );

  useEffect(() => {
    if (!user) {
      dispatch(getUser(userId));
    }
  }, [userId, dispatch, user]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      {/* أي بيانات إضافية */}
    </div>
  );
}
