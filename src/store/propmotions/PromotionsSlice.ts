import { createSlice } from '@reduxjs/toolkit';
import { IDefaultSlice, IPromotions } from '@/types/index';
import {
  clearMetaStore,
  deleteItem,
  ExtraReducerBuilder,
  setItem,
  setItems
} from '@/utils/redux';
import {
  promotionsCreateOne,
  promotionsDeleteOne,
  promotionsFetch,
  promotionsFetchOne,
  promotionsSearch, promotionsUpdateOne
} from '@/store/propmotions/PromotionsAsync';

export interface IPromotionsSlice extends IDefaultSlice {
  item: IPromotions | object
  items: IPromotions[]
}

const initialState: IPromotionsSlice = {
  item: {},
  items: [],
  status: null,
  error: null
};

export const promotionsSlice = createSlice({
  name: 'promotions',
  initialState,
  reducers: {
    clearMeta: clearMetaStore
  },
  extraReducers: builder => {
    const extraReducerBuild = new ExtraReducerBuilder<IPromotionsSlice>(builder);

    extraReducerBuild.addCases(promotionsFetch, setItems);
    extraReducerBuild.addCases(promotionsSearch, setItems);
    extraReducerBuild.addCases(promotionsFetchOne, setItem);
    extraReducerBuild.addCases(promotionsDeleteOne, deleteItem);
    extraReducerBuild.addCases(promotionsCreateOne);
    extraReducerBuild.addCases(promotionsUpdateOne);
  }
});

export const { clearMeta } = promotionsSlice.actions;
