// redux/companySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state type
interface CompanyState {
    companyId: string | null;
}

// Initial state value
const initialState: CompanyState = {
    companyId: null,
};

// Create the slice for company state
const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        // Action to set the companyId
        setCompanyId: (state, action: PayloadAction<string>) => {
            state.companyId = action.payload;
        },
        // Action to clear the companyId (e.g., on logout)
        clearCompanyId: (state) => {
            state.companyId = null;
        },
    },
});

// Export actions for use in components
export const { setCompanyId, clearCompanyId } = companySlice.actions;

// Export reducer to include in store
export default companySlice.reducer;