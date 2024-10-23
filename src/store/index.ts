import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import exampleReducer from './slices/exampleSlice';

const makeStore = () =>
    configureStore({
        reducer: {
            example: exampleReducer,
        },
    });

export const wrapper = createWrapper(makeStore);
