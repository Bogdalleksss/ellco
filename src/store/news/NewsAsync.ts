import AsyncThunkService from '@/services/AsyncThunkService';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { $axios } from '@/utils/api';

const api = new AsyncThunkService('/news', 'news');

interface INewsUpdate {
  id: string
  body: FormData
}

export const newsFetch = api.fetchAll();
export const newsCreateOne = createAsyncThunk(
  'news/create',
  async (body: FormData, { rejectWithValue }) => {
    try {
      await $axios.post('/news', body);
    } catch (e) {
      const { message } = e.response.data;
      return rejectWithValue(message || e.message);
    }
  }
);
export const newsDeleteOne = api.delete();
export const newsUpdateOne = createAsyncThunk(
  'news/update',
  async ({ id, body }: INewsUpdate, { rejectWithValue }) => {
    try {
      await $axios.put(`/news/${id}`, body);
    } catch (e) {
      const { message } = e.response.data;
      return rejectWithValue(message || e.message);
    }
  }
);
export const newsFetchOne = api.fetchOne();
export const newsSearch = api.search();
