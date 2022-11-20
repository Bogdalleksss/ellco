import { createAsyncThunk } from '@reduxjs/toolkit';
import { $axios } from '@/utils/api';
import { ICams } from '@/store/settings/SettingsSlice';

export interface IInformationBody {
  email: string
  phone: string
}

export interface IOrderSettingsBody {
  pricePrivate: string
  priceApartment: string
}

export interface ICCTVSettingBody {
  recordKeepDays: string
  pricePerDay: number
  camsForBuy: ICams[]
}

export const fetchInformation = createAsyncThunk(
  'settings/information/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await $axios.get('/information');

      return data;
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

      return data;
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

export const fetchCCTVSettings = createAsyncThunk(
  'settings/cctv/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await $axios.get('/settings/cctv');

      return data;
    } catch (e) {
      const { message } = e.response.data;
      return rejectWithValue(message || e.message);
    }
  }
);

export const updateCCTVSettings = createAsyncThunk(
  'settings/cctv/update',
  async (body: ICCTVSettingBody, { rejectWithValue }) => {
    try {
      const { data } = await $axios.put('/settings/cctv', body);

      return data;
    } catch (e) {
      const { message } = e.response.data;
      return rejectWithValue(message || e.message);
    }
  }
);
