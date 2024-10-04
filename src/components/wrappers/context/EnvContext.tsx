// context/EnvProvider.js
// This file allows us to 

import React, { createContext, useContext, ReactNode } from 'react';
import { getEnvVars } from '../../../lib/env';

// Define the shape of your environment variables
interface EnvContextType {
    isProduction: boolean;
    baseUrl: string;
    supabaseUrl: string;
    supabaseAnonKey: string;
    quickbooksEnvironment: string;
    quickbooksClientId: string;
    quickbooksSecretKey: string;
    quickbooksAccountingApi: string;  // Include all required variables
    quickbooksPaymentsApi: string;     // Include all required variables
}

const EnvContext = createContext<EnvContextType | undefined>(undefined);

export const EnvProvider = ({ children }: { children: ReactNode }) => {
    const envVars = getEnvVars();

    // Ensure that envVars has all the required properties
    const contextValue: EnvContextType = {
        isProduction: envVars.isProduction as boolean,
        baseUrl: envVars.baseUrl as string,
        supabaseUrl: envVars.supabaseUrl as string,
        supabaseAnonKey: envVars.supabaseAnonKey as string,
        quickbooksEnvironment: envVars.quickbooksEnvironment as string,
        quickbooksClientId: envVars.quickbooksClientId as string,
        quickbooksSecretKey: envVars.quickbooksSecretKey as string,
        quickbooksAccountingApi: envVars.quickbooksAccountingApi as string,
        quickbooksPaymentsApi: envVars.quickbooksPaymentsApi as string,
    };

    return (
        <EnvContext.Provider value={contextValue}>
            {children}
        </EnvContext.Provider>
    );
};

export const useEnv = () => {
    const context = useContext(EnvContext);
    if (!context) {
        throw new Error('useEnv must be used within an EnvProvider');
    }
    return context;
};
