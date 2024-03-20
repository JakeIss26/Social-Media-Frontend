// AuthorizationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const authorize = createAsyncThunk(
  'authorization/authorize',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/user/login", formData);
      const dataObject = response.data;
      const accessToken = dataObject.access_token;

      localStorage.setItem('Token', accessToken);
      
      return accessToken;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  token: null,
  error: null,
  loading: false,
  loginData: null,
};

const AuthorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setLoginData(state, action) {
      state.loginData = action.payload;
    },
    clearLoginData(state) {
      state.loginData = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authorize.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authorize.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(authorize.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLoginData, clearLoginData } = AuthorizationSlice.actions;

export default AuthorizationSlice.reducer;
