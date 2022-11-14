import { createSlice } from '@reduxjs/toolkit';
import { ExtraReducerBuilder, setSuccess } from '@/utils/redux';
import { IDefaultSlice } from '@/types/index';
import {
  fetchCCTVSettings,
  fetchInformation,
  fetchOrderSettings,
  updateCCTVSettings,
  updateInformation,
  updateOrderSettings
} from '@/store/settings/SettingsAsync';

interface ISettingsSlice extends IDefaultSlice {
  email: string
  phone: string
  pricePrivate: string
  priceApartment: string
  recordKeepDays: string
  camsForBuy: string
}

const initialState: ISettingsSlice = {
  email: '',
  phone: '',
  pricePrivate: '',
  priceApartment: '',
  recordKeepDays: '',
  camsForBuy: '',
  status: null,
  error: null
};

export const settingsSlice = createSlice({
  name: 'settlements',
  initialState,
  reducers: {},
  extraReducers: builder => {
    const extraReducerBuild = new ExtraReducerBuilder<ISettingsSlice>(builder);

    extraReducerBuild.addCases(fetchInformation, (state, { payload }) => {
      setSuccess(state);
      state.email = payload.email;
      state.phone = payload.phone;
    });
    extraReducerBuild.addCases(fetchOrderSettings, (state, { payload }) => {
      setSuccess(state);
      state.pricePrivate = payload.pricePrivate;
      state.priceApartment = payload.priceApartment;
    });
    extraReducerBuild.addCases(fetchCCTVSettings, (state, { payload }) => {
      setSuccess(state);
      state.recordKeepDays = payload.recordKeepDays.join(',');
      state.camsForBuy = payload.camsForBuy.join(',');
    });

    extraReducerBuild.addCases(updateInformation);
    extraReducerBuild.addCases(updateOrderSettings);
    extraReducerBuild.addCases(updateCCTVSettings);
  }
});
