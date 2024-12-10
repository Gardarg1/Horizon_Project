import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Post, PostsState } from './types';
import { createPost, deletePost, findPost, getPosts } from './actions';

const initialCurrentPage: Post = {
  id: '',
  title: '',
  img: '',
  content: '',
};
const initialState: PostsState = {
  data: [],
  currentPage: initialCurrentPage,
  loading: true,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.data = action.payload?.data;
      state.loading = false;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      console.log(action.error);
      state.loading = false;
    });
    builder.addCase(findPost.fulfilled, (state, action) => {
      state.currentPage = action.payload?.data;
    });
    builder.addCase(findPost.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      console.log(action.payload);
      state.data = action.payload?.data;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.data = action.payload?.data;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      console.log(action.error);
    });
  },
});
export default postsSlice.reducer;
export const selectPostsState = (state: RootState) => state.posts;
