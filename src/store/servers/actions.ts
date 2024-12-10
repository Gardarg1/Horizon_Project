import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getGameServers = createAsyncThunk('get servers', async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/servers`);

    return res;
  } catch (error) {
    console.log(error);
  }
});
export const findGameServer = createAsyncThunk('find game server', async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/servers/:server`);

    return res;
  } catch (error) {
    console.log(error);
  }
});
