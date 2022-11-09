import { createAsyncThunk } from '@reduxjs/toolkit';
import { $axios } from '@/utils/api';

interface IAsyncThunkUpdate<T> {
  id: string
  body: T
}

export default class AsyncThunkService {
  readonly route: string;
  readonly type: string;

  constructor (route: string, type: string) {
    this.route = route;
    this.type = type;
  }

  fetchAll () {
    return createAsyncThunk(
      `${this.type}/fetch`,
      async (_, { rejectWithValue }) => {
        try {
          const { data } = await $axios.get(this.route);

          return data;
        } catch (e) {
          const { message } = e.response.data;
          return rejectWithValue(message || e.message);
        }
      }
    );
  }

  fetchOne () {
    return createAsyncThunk(
      `${this.type}/fetch/one`,
      async (id: string, { rejectWithValue }) => {
        try {
          const { data } = await $axios.get(`${this.route}/${id}`);

          return data;
        } catch (e) {
          const { message } = e.response.data;
          return rejectWithValue(message || e.message);
        }
      }
    );
  }

  create<T> () {
    return createAsyncThunk(
      `${this.type}/create`,
      async (body: T, { rejectWithValue }) => {
        try {
          const { data } = await $axios.post(this.route, body);

          return data;
        } catch (e) {
          const { message } = e.response.data;
          return rejectWithValue(message || e.message);
        }
      }
    );
  }

  delete () {
    return createAsyncThunk(
      `${this.type}/delete`,
      async (id: string, { rejectWithValue }) => {
        try {
          await $axios.delete(`${this.route}/${id}`);

          return id;
        } catch (e) {
          const { message } = e.response.data;
          return rejectWithValue(message || e.message);
        }
      }
    );
  }

  update<T> () {
    return createAsyncThunk(
      `${this.type}/update`,
      async ({ id, body }: IAsyncThunkUpdate<T>, { rejectWithValue }) => {
        try {
          const { data } = await $axios.put(`${this.route}/${id}`, body);

          return data;
        } catch (e) {
          const { message } = e.response.data;
          return rejectWithValue(message || e.message);
        }
      }
    );
  }

  search () {
    return createAsyncThunk(
      `${this.type}/search`,
      async (query: string, { rejectWithValue }) => {
        try {
          const { data } = await $axios.get(`${this.route}/search/${query}`);

          return data;
        } catch (e) {
          const { message } = e.response.data;
          return rejectWithValue(message || e.message);
        }
      }
    );
  }
}
