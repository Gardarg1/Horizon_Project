import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ServersState } from './types';
import { getGameServers } from './actions';

const initialState: ServersState = {
  data: [],
  loading: true,
};

export const serversSlice = createSlice({
  name: 'servers',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGameServers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getGameServers.rejected, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getGameServers.fulfilled, (state, action) => {
      state.data = action.payload?.data;
      state.loading = false;
    });
  },
});
export default serversSlice.reducer;
export const selectServersState = (state: RootState) => state.servers;
