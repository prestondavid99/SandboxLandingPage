import { NextApiRequest, NextApiResponse } from 'next';
import { getEnvVars } from '@/lib/env';

const OAuthClient = require('intuit-oauth');

const { baseUrl, quickbooksClientId, quickbooksSecretKey, quickbooksEnvironment } = getEnvVars();

const config = {
    environment: quickbooksEnvironment,
    clientId: quickbooksClientId,
    clientSecret: quickbooksSecretKey,
    redirectUri: `${baseUrl}/api/quickbooks/callback`,
};

const oauthClient = new OAuthClient(config);

// API route to initiate the OAuth flow
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Enable the category/scope in your Intuit Developer app > Settings > App categories
        const authUrl = oauthClient.authorizeUri({ scope: ['com.intuit.quickbooks.accounting'] });
        res.redirect(authUrl);
    } catch (error) {
        console.error('Error generating authorization URL:', error);
        res.status(500).json({ error: 'Failed to generate authorization URL' });
    }
}
