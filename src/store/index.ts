import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '@/store/auth/AuthSlice';
import { usersSlice } from '@/store/users/UsersSlice';
import { newsSlice } from '@/store/news/NewsSlice';
import { promotionsSlice } from '@/store/propmotions/PromotionsSlice';
import { districtsSlice } from '@/store/districts/DistrictsSlice';
import { settlementsSlice } from '@/store/settlements/SettlementsSlice';
import { settingsSlice } from '@/store/settings/SettingsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    news: newsSlice.reducer,
    districts: districtsSlice.reducer,
    settlements: settlementsSlice.reducer,
    settings: settingsSlice.reducer,
    promotions: promotionsSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
