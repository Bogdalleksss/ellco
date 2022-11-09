import { createSlice, ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { NoInfer } from 'react-redux';
import { IDefaultSlice, IUser } from '@/types/index';
import { authLogout, authSignIn } from '@/store/auth/AuthAsync';
import { clearMetaStore, setError, setPending, setSuccess } from '@/utils/redux';

export interface IAuthSlice extends IDefaultSlice {
  me: IUser | null
  isAuth: boolean
}

const initialState: IAuthSlice = {
  me: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  isAuth: !!localStorage.getItem('access_token') || false,
  status: null,
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearMeta: clearMetaStore
  },
  extraReducers: (builder: ActionReducerMapBuilder<NoInfer<IAuthSlice>>) => {
    builder.addCase(authSignIn.fulfilled, (state: IAuthSlice, { payload }: PayloadAction<IUser>) => {
      setSuccess(state);
      state.isAuth = true;
      state.me = payload;
    });
    builder.addCase(authSignIn.pending, setPending);
    builder.addCase(authSignIn.rejected, setError);

    builder.addCase(authLogout.fulfilled, (state: IAuthSlice) => {
      setSuccess(state);
      state.isAuth = false;
      state.me = null;
    });
    builder.addCase(authLogout.pending, setPending);
    builder.addCase(authLogout.rejected, setError);
  }
});

export const { clearMeta } = authSlice.actions;
