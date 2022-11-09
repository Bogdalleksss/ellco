import AsyncThunkService from '@/services/AsyncThunkService';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { $axios } from '@/utils/api';

const api = new AsyncThunkService('/promotions', 'promotions');

interface INewsUpdate {
  id: string
  body: FormData
}

export const promotionsFetch = api.fetchAll();
export const promotionsCreateOne = createAsyncThunk(
  'promotions/create',
  async (body: FormData, { rejectWithValue }) => {
    try {
      await $axios.post('/promotions', body);
    } catch (e) {
      const { message } = e.response.data;
      return rejectWithValue(message || e.message);
    }
  }
);
export const promotionsDeleteOne = api.delete();
export const promotionsUpdateOne = createAsyncThunk(
  'promotions/update',
  async ({ id, body }: INewsUpdate, { rejectWithValue }) => {
    try {
      await $axios.put(`/promotions/${id}`, body);
    } catch (e) {
      const { message } = e.response.data;
      return rejectWithValue(message || e.message);
    }
  }
);
export const promotionsFetchOne = api.fetchOne();
export const promotionsSearch = api.search();
