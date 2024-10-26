// store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import bankingSlice from './slices/bankingSlice';
import settingsSlice from './slices/settingsSlice';
import companySlice from './slices/companySlice';

// Configure the store
const makeStore = () =>
    configureStore({
        reducer: {
            settings: settingsSlice,
            company: companySlice,
            banking: bankingSlice,
        },
    });

// Define types for the store and its state
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']; // Add this for typed dispatch

// Create a wrapper for Next.js
export const wrapper = createWrapper<AppStore>(makeStore);
