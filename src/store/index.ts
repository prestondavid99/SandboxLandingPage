import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import bankingSlice from './slices/bankingSlice';
import settingsSlice from './slices/settingsSlice';

const makeStore = () =>
    configureStore({
        reducer: {
            settings: settingsSlice,
            banking: bankingSlice,
        },
    });

    export type AppStore = ReturnType<typeof makeStore>;
    export type AppState = ReturnType<AppStore['getState']>;
    
    export const wrapper = createWrapper<AppStore>(makeStore);
