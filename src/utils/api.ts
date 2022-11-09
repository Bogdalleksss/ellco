import axios from 'axios';
import { authLogout } from '@/store/auth/AuthAsync';

const UNAUTHORIZED = 401;

export const $axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL || ''
});

$axios.interceptors.request.use(config => {
  const accessToken: string = localStorage.getItem('access_token');

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

export const interceptor = (dispatch) => {
  $axios.interceptors.response.use(
    response => response,
    async error => {
      const refresh_token: string = localStorage.getItem('refresh_token');

      if (error.response.status === UNAUTHORIZED) {
        try {
          const res = await axios.post(`${process.env.REACT_APP_API_URL}/refresh`, {
            refreshToken: refresh_token
          });

          const { accessToken, refreshToken } = res.data;

          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('refresh_token', refreshToken);

          $axios.defaults.headers.common.Authorization = accessToken;

          return $axios(error.config);
        } catch (err) {
          dispatch(authLogout());
        }
      }

      return await Promise.reject(error);
    }
  );
};
