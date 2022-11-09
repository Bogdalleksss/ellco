import AsyncThunkService from '@/services/AsyncThunkService';
import { IDistricts } from '@/types/index';

const api = new AsyncThunkService('/districts', 'districts');

export const districtsFetch = api.fetchAll();
export const districtsCreateOne = api.create<IDistricts>();
export const districtsDeleteOne = api.delete();
export const districtsUpdateOne = api.update<IDistricts>();
export const districtsFetchOne = api.fetchOne();
export const districtsSearch = api.search();
