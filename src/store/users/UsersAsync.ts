import AsyncThunkService from '@/services/AsyncThunkService';
import { ISignIn } from '@/types/index';

const api = new AsyncThunkService('/users', 'users');

export const usersFetch = api.fetchAll();
export const userCreateOne = api.create<ISignIn>();
export const userDeleteOne = api.delete();
export const usersUpdateOne = api.update<ISignIn>();
export const usersFetchOne = api.fetchOne();
export const usersSearch = api.search();
