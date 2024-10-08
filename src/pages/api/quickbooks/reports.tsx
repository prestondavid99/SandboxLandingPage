// reports.ts

import fetch from 'node-fetch'; // Import fetch to make HTTP requests. Ensure `node-fetch` is installed by running: npm install node-fetch
import { createClient } from '@supabase/supabase-js';
import { getEnvVars } from "@/lib/env";
import {refreshQuickBooksToken} from "@/pages/api/quickbooks/refresh"; // Import environment variables
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

// Retrieve Supabase environment variables
const { supabaseUrl, supabaseAnonKey } = getEnvVars();
const supabase = createClient(supabaseUrl!, supabaseAnonKey!);
const companyId = useSelector((state: RootState) => state.company.companyId);

// Define the type for the response (optional, helps with TypeScript type safety)
export interface ReportResponse {
    Header: {
        ReportName: string;
        StartPeriod: string;
        EndPeriod: string;
    };
    Rows: any; // You can define a more specific type if the structure of rows is known
}

// Define a function to get the Cash Flow report
export async function getCashFlowReport(): Promise<ReportResponse | null> {
    try {
        // Retrieve the access token from Supabase
        const accessToken = await refreshQuickBooksToken(companyId!);

        if (!accessToken) {
            throw new Error('Access token is missing or invalid');
        }

        // Construct the URL for the Cash Flow report
        const reportEndpoint = `https://quickbooks.api.intuit.com/v3/company/${companyId}/reports/CashFlow`;

        // Make the GET request to retrieve the cash flow report
        const response = await fetch(reportEndpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`, // Use the access token to authorize the request
                'Accept': 'application/json', // Expect JSON response
            },
        });

        // Check if the response is successful
        if (!response.ok) {
            console.error(`Failed to retrieve cash flow report: ${response.statusText}`);
            return null;
        }

        // Parse and return the report data
        const reportData = await response.json();
        return reportData as ReportResponse;
    } catch (error) {
        console.error('Error making request to get Cash Flow report:', error);
        return null;
    }
}
