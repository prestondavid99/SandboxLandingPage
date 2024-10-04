// reports.ts

import fetch from 'node-fetch'; // Import fetch to make HTTP requests. Ensure `node-fetch` is installed by running: npm install node-fetch
import { createClient } from '@supabase/supabase-js';
import { getEnvVars } from "@/lib/env"; // Import environment variables

// Retrieve Supabase environment variables
const { supabaseUrl, supabaseAnonKey } = getEnvVars();
const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

// Define the type for the response (optional, helps with TypeScript type safety)
interface ReportResponse {
    Header: {
        ReportName: string;
        StartPeriod: string;
        EndPeriod: string;
    };
    Rows: any; // You can define a more specific type if the structure of rows is known
}

// Function to get access token from Supabase
async function getAccessToken(companyId: string): Promise<string | null> {
    // Query Supabase to retrieve the access token for the given companyId
    const { data, error } = await supabase
        .from('company') // Replace 'company' with the name of your table storing tokens
        .select('quickbooks_access_token')
        .eq('quickbooks_company_id', companyId)
        .single(); // We expect only one record per companyId

    if (error) {
        console.error('Failed to fetch access token from Supabase:', error);
        return null;
    }

    return data ? data.quickbooks_access_token : null;
}

// Define a function to get the Cash Flow report
export async function getCashFlowReport(companyId: string): Promise<ReportResponse | null> {
    try {
        // Retrieve the access token from Supabase
        const accessToken = await getAccessToken(companyId);

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
