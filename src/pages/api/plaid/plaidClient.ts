import { getEnvVars } from "@/lib/env";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

const { plaidClientId, plaidSecretKey, plaidEnvironment } = getEnvVars();

const configuration = new Configuration({
    basePath: plaidEnvironment === 'production' 
        ? PlaidEnvironments.production 
        : PlaidEnvironments.sandbox, // Default to sandbox if not specified
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': plaidClientId,
            'PLAID-SECRET': plaidSecretKey,
        },
    },
});

export const plaidClient = new PlaidApi(configuration);