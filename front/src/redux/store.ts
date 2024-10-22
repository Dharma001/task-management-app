import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './loadingSlice';
import toggleReducer from './toggleSlice';

const store = configureStore({
    reducer: {
        loading: loadingReducer,
        toggle: toggleReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
