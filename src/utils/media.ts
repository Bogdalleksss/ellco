import { storageBaseUrl } from '@/utils/constants';

export const getImageUrl = (url) => url.includes('http') ? url : `${storageBaseUrl}/${url}`;
