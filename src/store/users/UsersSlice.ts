import { createSlice } from '@reduxjs/toolkit';
import { IDefaultSlice, IUser } from '@/types/index';
import {
  clearMetaStore,
  deleteItem,
  ExtraReducerBuilder,
  setItem,
  setItems
} from '@/utils/redux';
import {
  userCreateOne,
  userDeleteOne,
  usersFetch,
  usersFetchOne, usersSearch,
  usersUpdateOne
} from '@/store/users/UsersAsync';

export interface IUsersSlice extends IDefaultSlice {
  item: IUser | object
  items: IUser[]
}

const initialState: IUsersSlice = {
  item: {},
  items: [],
  status: null,
  error: null
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearMeta: clearMetaStore
  },
  extraReducers: builder => {
    const extraReducerBuild = new ExtraReducerBuilder<IUsersSlice>(builder);

    extraReducerBuild.addCases(usersFetch, setItems);
    extraReducerBuild.addCases(usersSearch, setItems);
    extraReducerBuild.addCases(usersFetchOne, setItem);
    extraReducerBuild.addCases(userDeleteOne, deleteItem);
    extraReducerBuild.addCases(userCreateOne);
    extraReducerBuild.addCases(usersUpdateOne);
  }
});

export const { clearMeta } = usersSlice.actions;
