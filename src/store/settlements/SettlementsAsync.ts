import AsyncThunkService from '@/services/AsyncThunkService';
import { ISettlement } from '@/types/index';

const api = new AsyncThunkService('/settlements', 'settlements');

export const settlementsFetch = api.fetchAll();
export const settlementsCreateOne = api.create<ISettlement>();
export const settlementsDeleteOne = api.delete();
export const settlementsUpdateOne = api.update<ISettlement>();
export const settlementsFetchOne = api.fetchOne();
export const settlementsSearch = api.search();
