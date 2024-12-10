import instance from '@/src/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPosts = createAsyncThunk('get posts', async (arg, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const findPost = createAsyncThunk(
  'get one nes by id',
  async (id: string, { rejectWithValue }) => {
    try {
      console.log(id);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${id}`);
      console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const createPost = createAsyncThunk(
  'create post',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await instance.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`, formData);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const deletePost = createAsyncThunk(
  'delete post',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${id}`);

      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
