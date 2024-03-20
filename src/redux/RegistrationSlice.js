// registrationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
    'registration/registerUser',
    async ({ login, password, birthDate, name, email, photo }) => {
        const apiEndpointRegister = "http://127.0.0.1:8000/api/user/register";
        const apiEndpointGet = "http://127.0.0.1:8000/api/image/getPhotoPath";
        const apiEndpointUpload = "http://127.0.0.1:8000/api/image/upload";

        try {
            const formData = new FormData();
            formData.append('photo_name', photo.name);

            const getResponse = await axios.post(apiEndpointGet, formData);
            let resultObject = getResponse.data;
            let avatarPath = resultObject.photo_path;

            formData.append('photo', photo);

            const registerFormData = new FormData();
            registerFormData.append('login', login);
            registerFormData.append('password', password);
            registerFormData.append('birth_date', birthDate);
            registerFormData.append('name', name);
            registerFormData.append('email', email);
            registerFormData.append('avatar_path', avatarPath);

            const registerResponse = await axios.post(apiEndpointRegister, registerFormData);
            const userId = registerResponse.data.user.id;

            formData.append('user_id', userId);

            const uploadResponse = await axios.post(apiEndpointUpload, formData);
            resultObject = uploadResponse.data;
            avatarPath = resultObject.photo_path;

            return userId;
        } catch (error) {
            throw new Error(error.response.data.message || error.message);
        }
    }
);

export const uploadPhoto = createAsyncThunk(
    'registration/uploadPhoto',
    async (photo) => {
        const apiEndpointUpload = "http://127.0.0.1:8000/api/image/upload";
        const formData = new FormData();
        formData.append('photo', photo);
        const response = await axios.post(apiEndpointUpload, formData);
        return response.data;
    }
);

export const clearRegistrationStatus = () => (dispatch) => {
    dispatch(registrationSlice.actions.clearError()); // Очистка только ошибки
};

const registrationSlice = createSlice({
    name: 'registration',
    initialState: {
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearError, clearLoading } = registrationSlice.actions;

export default registrationSlice.reducer;
