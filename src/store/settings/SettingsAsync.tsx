import { createAsyncThunk } from '@reduxjs/toolkit';
import { $axios } from '@/utils/api';

export interface IInformationBody {
  email: string
  phone: string
}

export interface IOrderSettingsBody {
  pricePrivate: string
  priceApartment: string
}

export const fetchInformation = createAsyncThunk(
  'settings/information/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await $axios.get('/information');

      return data[0];
    } catch (e) {
      const { message } = e.response.data;
      return rejectWithValue(message || e.message);
    }
  }
);

export const updateInformation = createAsyncThunk(
  'settings/information/update',
  async (body: IInformationBody, { rejectWithValue }) => {
    try {
      const { data } = await $axios.put('/information', body);

      return data;
    } catch (e) {
      const { message } = e.response.data;
      return rejectWithValue(message || e.message);
    }
  }
);

export const fetchOrderSettings = createAsyncThunk(
  'settings/order/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await $axios.get('/settings/order');

      return data[0];
    } catch (e) {
      const { message } = e.response.data;
      return rejectWithValue(message || e.message);
    }
  }
);

export const updateOrderSettings = createAsyncThunk(
  'settings/order/update',
  async (body: IOrderSettingsBody, { rejectWithValue }) => {
    try {
      const { data } = await $axios.put('/settings/order', body);

      return data;
    } catch (e) {
      const { message } = e.response.data;
      return rejectWithValue(message || e.message);
    }
  }
);
