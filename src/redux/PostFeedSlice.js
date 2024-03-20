// postFeedSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk(
  'postFeed/fetchPosts',
  async ({ currentPage, batchSize }, thunkAPI) => {
    try {
      const token = localStorage.getItem('Token');
      const responses = await Promise.all(
        Array.from({ length: batchSize }, (_, i) =>
          axios.get(`http://127.0.0.1:8000/api/post?page=${currentPage + i}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        )
      );
      const newPosts = responses.flatMap((response, i) => response.data.data);
      return newPosts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  posts: [],
  loading: false,
  currentPage: 1,
  hasMore: true,
  batchSize: 3,
  error: null,
};

const PostFeedSlice = createSlice({
  name: 'postFeed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        const newPosts = action.payload;
        if (newPosts.length > 0) { // Проверяем, есть ли новые посты
          state.posts = [...state.posts, ...newPosts];
          state.currentPage += state.batchSize;
        }
        state.hasMore = newPosts.length > 0;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },  
});

export default PostFeedSlice.reducer;