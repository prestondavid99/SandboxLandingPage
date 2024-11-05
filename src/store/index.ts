// store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import bankingSlice from './slices/bankingSlice';
import settingsSlice from './slices/settingsSlice';

// Configure the store
const makeStore = () =>
    configureStore({
        reducer: {
            banking: bankingSlice,
            settings: settingsSlice,
        },
    });

// Define types for the store and its state
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']; // Add this for typed dispatch

// Create a wrapper for Next.js
export const wrapper = createWrapper<AppStore>(makeStore);
