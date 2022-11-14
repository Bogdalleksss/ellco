import { IDefaultSlice, ITariff } from '@/types/index';
import { createSlice } from '@reduxjs/toolkit';
import { clearMetaStore, deleteItem, ExtraReducerBuilder, setItem, setItems } from '@/utils/redux';
import {
  tariffsCreateOne,
  tariffsDeleteOne,
  tariffsFetch,
  tariffsFetchOne,
  tariffsSearch, tariffsUpdateOne
} from '@/store/tariffs/TariffsAsync';

export interface ITariffsSlice extends IDefaultSlice {
  item: ITariff | object
  items: ITariff[]
}

const initialState: ITariffsSlice = {
  item: {},
  items: [],
  status: null,
  error: null
};

export const tariffsSlice = createSlice({
  name: 'tariffs',
  initialState,
  reducers: {
    clearMeta: clearMetaStore
  },
  extraReducers: builder => {
    const extraReducerBuild = new ExtraReducerBuilder<ITariffsSlice>(builder);

    extraReducerBuild.addCases(tariffsFetch, setItems);
    extraReducerBuild.addCases(tariffsSearch, setItems);
    extraReducerBuild.addCases(tariffsFetchOne, setItem);
    extraReducerBuild.addCases(tariffsDeleteOne, deleteItem);
    extraReducerBuild.addCases(tariffsCreateOne);
    extraReducerBuild.addCases(tariffsUpdateOne);
  }
});

export const { clearMeta } = tariffsSlice.actions;
