import { createSlice } from '@reduxjs/toolkit';
import { IDefaultSlice, ISettlement } from '@/types/index';
import {
  clearMetaStore,
  deleteItem,
  ExtraReducerBuilder,
  setItem,
  setItems
} from '@/utils/redux';
import {
  settlementsCreateOne,
  settlementsDeleteOne,
  settlementsFetch,
  settlementsFetchOne,
  settlementsSearch, settlementsUpdateOne
} from '@/store/settlements/SettlementsAsync';

export interface ISettlementsSlice extends IDefaultSlice {
  item: ISettlement | object
  items: ISettlement[]
}

const initialState: ISettlementsSlice = {
  item: {},
  items: [],
  status: null,
  error: null
};

export const settlementsSlice = createSlice({
  name: 'settlements',
  initialState,
  reducers: {
    clearMeta: clearMetaStore
  },
  extraReducers: builder => {
    const extraReducerBuild = new ExtraReducerBuilder<ISettlementsSlice>(builder);

    extraReducerBuild.addCases(settlementsFetch, setItems);
    extraReducerBuild.addCases(settlementsSearch, setItems);
    extraReducerBuild.addCases(settlementsFetchOne, setItem);
    extraReducerBuild.addCases(settlementsDeleteOne, deleteItem);
    extraReducerBuild.addCases(settlementsCreateOne);
    extraReducerBuild.addCases(settlementsUpdateOne);
  }
});

export const { clearMeta } = settlementsSlice.actions;
