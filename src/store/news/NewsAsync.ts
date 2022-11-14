import AsyncThunkService from '@/services/AsyncThunkService';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { $axios } from '@/utils/api';
import { IFormDataUpdate } from '@/types/index';

const api = new AsyncThunkService('/news', 'news');

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
  async ({ id, body }: IFormDataUpdate, { rejectWithValue }) => {
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
