import { createSlice } from '@reduxjs/toolkit';
import { IDefaultSlice, IDistricts } from '@/types/index';
import {
  clearMetaStore,
  deleteItem,
  ExtraReducerBuilder,
  setItem,
  setItems
} from '@/utils/redux';
import {
  districtsCreateOne,
  districtsDeleteOne,
  districtsFetch,
  districtsFetchOne,
  districtsSearch, districtsUpdateOne
} from '@/store/districts/DistrictsAsync';

export interface IDistrictsSlice extends IDefaultSlice {
  item: IDistricts | object
  items: IDistricts[]
}

const initialState: IDistrictsSlice = {
  item: {},
  items: [],
  status: null,
  error: null
};

export const districtsSlice = createSlice({
  name: 'districts',
  initialState,
  reducers: {
    clearMeta: clearMetaStore
  },
  extraReducers: builder => {
    const extraReducerBuild = new ExtraReducerBuilder<IDistrictsSlice>(builder);

    extraReducerBuild.addCases(districtsFetch, setItems);
    extraReducerBuild.addCases(districtsSearch, setItems);
    extraReducerBuild.addCases(districtsFetchOne, setItem);
    extraReducerBuild.addCases(districtsDeleteOne, deleteItem);
    extraReducerBuild.addCases(districtsCreateOne);
    extraReducerBuild.addCases(districtsUpdateOne);
  }
});

export const { clearMeta } = districtsSlice.actions;
