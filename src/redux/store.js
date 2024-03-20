import { configureStore } from '@reduxjs/toolkit';
import RegistrationSlice from './RegistrationSlice';
import AuthorizationSlice from './AuthorizationSlice';
import ProfileSlice from './ProfileSlice';
import PostFeedSlice from './PostFeedSlice';
import PostPhotosSlice from './PostPhotosSlice';

const store = configureStore({
  reducer: {
    registration: RegistrationSlice,
    auth: AuthorizationSlice,
    profile: ProfileSlice,
    postFeed: PostFeedSlice,
    postPhotos: PostPhotosSlice,
  },
});

export default store;