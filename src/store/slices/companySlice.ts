// store/slices/companySlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '@/lib/supabase/supabaseClient'; // Adjust the import according to your setup

// Define the shape of the state
interface CompanyState {
    id: number;
    name: string;
}

// Initial state
const initialState: CompanyState = {
    id: 0,
    name: 'defaultCompanyName',
};

// Async thunk to fetch company data
export const fetchUserCompany = createAsyncThunk<
    CompanyState, // Return type of the payload creator
    string // First argument to the payload creator
>('company/fetchUserCompany', async (userId: string) => {
    const { data, error } = await supabase
        .from('user_company')
        .select('*')
        .eq('user_id', userId) // Adjust this query based on your schema
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data as CompanyState; // Make sure to return the correct type
});

// Create the slice
const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        // Your synchronous reducers here...
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserCompany.fulfilled, (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
        });
    },
});

// Export actions and reducer
export const { /* your sync actions */ } = companySlice.actions;
export default companySlice.reducer;
