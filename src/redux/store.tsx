// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './companySlice';

// Configure and export the store
const store = configureStore({
    reducer: {
        company: companyReducer,
    },
});

// Export types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;