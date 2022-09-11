import { configureStore } from '@reduxjs/toolkit';

import dataReducer from './slice/data';

const store =configureStore({
  reducer: {
    data: dataReducer,
  },
  devTools: true
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
