import AsyncThunkService from '@/services/AsyncThunkService';
import { ITariff } from '@/types/index';

const api = new AsyncThunkService('/tariffs', 'tariffs');

export const tariffsFetch = api.fetchAll();
export const tariffsCreateOne = api.create<ITariff>();
export const tariffsDeleteOne = api.delete();
export const tariffsUpdateOne = api.update<ITariff>();
export const tariffsFetchOne = api.fetchOne();
export const tariffsSearch = api.search();
