import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPeriod } from '@/types/interfaces';

// Set up default period
const today = new Date();
const defaultPeriod: IPeriod = {
    type: 'daily',
    openingDate: today,
    closingDate: today,
};

// define the shape of the state
interface SettingsState {
    period: IPeriod;
    includeCredit: boolean;
}

// Define the initial state with strict types
const initialState: SettingsState = {
    period: defaultPeriod,
    includeCredit: false,
};

// Create the slice
const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setPeriod: (state, action: PayloadAction<IPeriod>) => {
            state.period = action.payload;
        },
        toggleIncludeCredit: (state) => {
            state.includeCredit = !state.includeCredit;
        },
        setIncludeCredit: (state, action: PayloadAction<boolean>) => {
            state.includeCredit = action.payload;
        },
    },
});

// Export actions
export const { 
    setPeriod,
    toggleIncludeCredit,
    setIncludeCredit,
} = settingsSlice.actions;

// Export reducer
export default settingsSlice.reducer;