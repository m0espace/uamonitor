import { configureStore } from '@reduxjs/toolkit';
import graphDataSlice from './slices/graphDataSlice';
import themeSlice from './slices/themeSlice';
import serversDataSlice from './slices/serversDataSlice';

export const store = configureStore({
  reducer: {
    graphData: graphDataSlice,
    theme: themeSlice,
    servers: serversDataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
