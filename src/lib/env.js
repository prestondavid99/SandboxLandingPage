// lib/env.js
// This file allows us to centralize environment variables
// We can use this both in frontend (through context/EnvContext) and backend (calling getEnvVars directly)

export const getEnvVars = () => {
    const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

    return {
        // General
        isProduction: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production',
        
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
        quickbooksClientId: isProduction
            ? process.env.NEXT_PUBLIC_QUICKBOOKS_CLIENT_ID_PROD
            : process.env.NEXT_PUBLIC_QUICKBOOKS_CLIENT_ID_DEV,

        quickbooksSecretKey: isProduction
            ? process.env.NEXT_PUBLIC_QUICKBOOKS_SECRET_KEY_PROD
            : process.env.NEXT_PUBLIC_QUICKBOOKS_SECRET_KEY_DEV,

        quickbooksAccountingApi: isProduction
            ? process.env.NEXT_PUBLIC_QUICKBOOKS_ACCOUNTING_API_PROD
            : process.env.NEXT_PUBLIC_QUICKBOOKS_ACCOUNTING_API_DEV,

        quickbooksPaymentsApi: isProduction
            ? process.env.NEXT_PUBLIC_QUICKBOOKS_PAYMENTS_API_PROD
            : process.env.NEXT_PUBLIC_QUICKBOOKS_PAYMENTS_API_DEV,
    };
};
