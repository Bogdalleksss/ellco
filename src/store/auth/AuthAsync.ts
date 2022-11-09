import { createAsyncThunk } from '@reduxjs/toolkit';
import { $axios } from '@/utils/api';
import { AxiosResponse } from 'axios';
import { ISignIn } from '@/types/index';

export const authSignIn = createAsyncThunk(
  'auth/signIn',
  async (body: ISignIn, { rejectWithValue }) => {
    try {
      const { data }: AxiosResponse = await $axios.post('/login', body);

      localStorage.setItem('access_token', data.accessToken);
      localStorage.setItem('refresh_token', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));

      return data.user;
    } catch (e) {
      const { message } = e.response.data;
      return rejectWithValue(message || e.message);
    }
  }
);

export const authLogout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await $axios.post('/logout');

      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');

      return;
    } catch (e) {
      const { message } = e.response.data;
      return rejectWithValue(message || e.message);
    }
  }
);
