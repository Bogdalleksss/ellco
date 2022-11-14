import AsyncThunkService from '@/services/AsyncThunkService';

const api = new AsyncThunkService('/orders', 'orders');

export const ordersFetch = api.fetchAll();
export const ordersFetchOne = api.fetchOne();
export const ordersSearch = api.search();
