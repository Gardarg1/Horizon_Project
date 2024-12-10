import { createSlice } from '@reduxjs/toolkit';
import { UsersState } from './types';
import { RootState } from '../store';
import { getUsers } from './actions';

const initialState: UsersState = {
  data: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.data = action.payload?.data;
    });
  },
});
export default usersSlice.reducer;
export const selectUsersState = (state: RootState) => state.users;
