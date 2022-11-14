import { createSlice } from '@reduxjs/toolkit';
import { IDefaultSlice, IOrder } from '@/types/index';
import {
  clearMetaStore,
  ExtraReducerBuilder,
  setItem,
  setItems
} from '@/utils/redux';
import { ordersFetch, ordersFetchOne, ordersSearch } from '@/store/orders/OrdersAsync';

export interface IOrdersSlice extends IDefaultSlice {
  item: IOrder | object
  items: IOrder[]
}

const initialState: IOrdersSlice = {
  item: {},
  items: [],
  status: null,
  error: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearMeta: clearMetaStore
  },
  extraReducers: builder => {
    const extraReducerBuild = new ExtraReducerBuilder<IOrdersSlice>(builder);

    extraReducerBuild.addCases(ordersFetch, setItems);
    extraReducerBuild.addCases(ordersSearch, setItems);
    extraReducerBuild.addCases(ordersFetchOne, setItem);
  }
});

export const { clearMeta } = ordersSlice.actions;
