import { createSlice } from '@reduxjs/toolkit';
import { IDefaultSlice, INews } from '@/types/index';
import {
  clearMetaStore,
  deleteItem,
  ExtraReducerBuilder,
  setItem,
  setItems
} from '@/utils/redux';
import {
  newsCreateOne,
  newsDeleteOne,
  newsFetch,
  newsFetchOne,
  newsSearch,
  newsUpdateOne
} from '@/store/news/NewsAsync';

export interface INewsSlice extends IDefaultSlice {
  item: INews | object
  items: INews[]
}

const initialState: INewsSlice = {
  item: {},
  items: [],
  status: null,
  error: null
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    clearMeta: clearMetaStore
  },
  extraReducers: builder => {
    const extraReducerBuild = new ExtraReducerBuilder<INewsSlice>(builder);

    extraReducerBuild.addCases(newsFetch, setItems);
    extraReducerBuild.addCases(newsSearch, setItems);
    extraReducerBuild.addCases(newsFetchOne, setItem);
    extraReducerBuild.addCases(newsDeleteOne, deleteItem);
    extraReducerBuild.addCases(newsCreateOne);
    extraReducerBuild.addCases(newsUpdateOne);
  }
});

export const { clearMeta } = newsSlice.actions;
