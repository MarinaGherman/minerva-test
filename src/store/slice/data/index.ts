import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../index';
import parseData, { Result } from './actions/parse-data';

type State = {
  items: Result[];
  error?: string;
  loading: boolean;
  isParsed: boolean;
}

const initialState: State = {
  items: [],
  error: undefined,
  loading: false,
  isParsed: false
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(parseData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(parseData.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.items = payload;
      state.isParsed = true;
    });

    builder.addCase(parseData.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message;
    });
  }
});


export const selectData = (state: RootState) => state.data.items;
export const isLoading = (state: RootState) => state.data.loading;
export const selectDataIsParsed = (state: RootState) => state.data.isParsed;

export default dataSlice.reducer;
