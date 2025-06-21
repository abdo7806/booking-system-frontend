import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAvailabilities,
  getAvailabilityById,
  createAvailability,
  updateAvailability,
  deleteAvailability,
} from '../../api/availabilityApi';

export const getAllAvailabilities = createAsyncThunk(
  'availability/fetchAll',
  fetchAvailabilities
);

export const getAvailability = createAsyncThunk(
  'availability/fetchOne',
  getAvailabilityById
);

export const addAvailability = createAsyncThunk(
  'availability/add',
  createAvailability
);

export const editAvailability = createAsyncThunk(
  'availability/edit',
  async ({ id, data }) => {
    return await updateAvailability(id, data);
  }
);

export const removeAvailability = createAsyncThunk(
  'availability/delete',
  deleteAvailability
);


