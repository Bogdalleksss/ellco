import { ActionCreator, ActionReducerMapBuilder, CaseReducer } from '@reduxjs/toolkit';
import { NoInfer } from 'react-redux';

export const setPending = (state) => {
  state.status = 'pending';
  state.error = null;
};
export const setSuccess = (state) => {
  state.status = 'success';
  state.error = null;
};
export const setError = (state, { payload }) => {
  state.status = 'error';
  state.error = payload;
};
export const setItems = (state, { payload }) => {
  setSuccess(state);
  state.items = payload;
};
export const setItem = (state, { payload }) => {
  setSuccess(state);
  state.item = payload;
};
export const deleteItem = (state, { payload }) => {
  setSuccess(state);
  state.items = state.items.filter(item => item._id !== payload);
};

export const clearMetaStore = (state) => {
  state.error = null;
  state.status = null;
};

export class ExtraReducerBuilder<T> {
  builder: ActionReducerMapBuilder<NoInfer<T>>;

  constructor (builder) {
    this.builder = builder;
  }

  addCases (actionCreator, reducer?: CaseReducer<T, ReturnType<ActionCreator<any>>>) {
    this.builder.addCase(actionCreator.fulfilled, reducer || setSuccess);
    this.builder.addCase(actionCreator.pending, setPending);
    this.builder.addCase(actionCreator.rejected, setError);
  }
}
