import {configureStore} from '@reduxjs/toolkit';
import {reducers} from './slices';
import {api} from './services';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    ...reducers,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: {warnAfter: 128},
      serializableCheck: {warnAfter: 128},
    }).concat(api.middleware),
});
