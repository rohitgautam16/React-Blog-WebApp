import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
           auth: authSlice,
           // Todo : Add other reducers here for Posts
    }
});

export default store;