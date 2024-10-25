// lib/env.js
// This file allows us to centralize environment variables
// We can use this both in frontend and backend (by calling getEnvVars directly)

export const getEnvVars = () => {
    const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

    return {
        // General
        isProduction: isProduction,
        
        baseUrl: isProduction
            ? process.env.NEXT_PUBLIC_BASE_URL_PROD
            : process.env.NEXT_PUBLIC_BASE_URL_DEV,

        // Supabase
        supabaseUrl: isProduction
            ? process.env.NEXT_PUBLIC_SUPABASE_URL_PROD
            : process.env.NEXT_PUBLIC_SUPABASE_URL_DEV,

        supabaseAnonKey: isProduction
            ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_PROD
            : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV,

        // Quickbooks
        quickbooksEnvironment: isProduction
            ? process.env.QUICKBOOKS_ENVIRONMENT_PROD
            : process.env.QUICKBOOKS_ENVIRONMENT_DEV,

        quickbooksClientId: isProduction
            ? process.env.QUICKBOOKS_CLIENT_ID_PROD
            : process.env.QUICKBOOKS_CLIENT_ID_DEV,

        quickbooksSecretKey: isProduction
            ? process.env.QUICKBOOKS_SECRET_KEY_PROD
            : process.env.QUICKBOOKS_SECRET_KEY_DEV,

        quickbooksAccountingApi: isProduction
            ? process.env.QUICKBOOKS_ACCOUNTING_API_PROD
            : process.env.QUICKBOOKS_ACCOUNTING_API_DEV,

        quickbooksPaymentsApi: isProduction
            ? process.env.QUICKBOOKS_PAYMENTS_API_PROD
            : process.env.QUICKBOOKS_PAYMENTS_API_DEV,

        // Plaid
        plaidEnvironment: isProduction
            ? process.env.PLAID_ENVIRONMENT_PROD
            : process.env.PLAID_ENVIRONMENT_DEV,

        plaidClientId: isProduction
            ? process.env.PLAID_CLIENT_ID_PROD
            : process.env.PLAID_CLIENT_ID_DEV,

        plaidSecretKey: isProduction
            ? process.env.PLAID_SECRET_KEY_PROD
            : process.env.PLAID_SECRET_KEY_DEV,

        plaidEndpoint: isProduction
            ? process.env.PLAID_ENDPOINT_PROD
            : process.env.PLAID_ENDPOINT_DEV,
    };
};
