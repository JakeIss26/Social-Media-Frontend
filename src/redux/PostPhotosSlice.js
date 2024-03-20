import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Создаем асинхронный thunk для загрузки фотографий поста по его ID
export const fetchPostPhotos = createAsyncThunk(
  'postPhotos/fetchPostPhotos',
  async (postId, thunkAPI) => {
    try {
      const token = localStorage.getItem('Token');
      const response = await axios.get(`http://127.0.0.1:8000/api/image/getPhotosByPostId/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Создаем начальное состояние
const initialState = {
  photos: [],
  loading: false,
  error: null
};

// Создаем slice
const PostPhotosSlice = createSlice({
  name: 'postPhotos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.photos = action.payload;
      })
      .addCase(fetchPostPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default PostPhotosSlice.reducer;
