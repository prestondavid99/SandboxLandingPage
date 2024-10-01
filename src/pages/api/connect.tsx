// pages/api/connect.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getEnvVars } from '../../lib/env';

export default function connect(req: NextApiRequest, res: NextApiResponse) {
    const { baseUrl, quickbooksClientId, quickbooksAccountingApi } = getEnvVars();

    // Step 1: Define the OAuth URL
    const redirectUri = `${baseUrl}/api/callback`; // Set this to your callback endpoint
    const scope = 'com.intuit.quickbooks.accounting'; // Define the necessary scopes
    const oauthUrl = `${quickbooksAccountingApi}/oauth2/v1/authorize?client_id=${quickbooksClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`;
    const url = `${quickbooksAccountingApi}/v3/company`

    // Step 2: Redirect the user to the QuickBooks OAuth URL
    res.redirect(oauthUrl);
}
