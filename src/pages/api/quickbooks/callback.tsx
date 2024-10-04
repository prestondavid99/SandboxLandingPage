import { NextApiRequest, NextApiResponse } from 'next';
import { getEnvVars } from '@/lib/env';
import { createClient } from '@supabase/supabase-js';

const OAuthClient = require('intuit-oauth');
const { baseUrl, quickbooksClientId, quickbooksSecretKey, quickbooksEnvironment } = getEnvVars();
const config = {
    environment: quickbooksEnvironment,
    clientId: quickbooksClientId,
    clientSecret: quickbooksSecretKey,
    redirectUri: `${baseUrl}/api/quickbooks/callback`,
};
const oauthClient = new OAuthClient(config);

const { supabaseUrl, supabaseAnonKey } = getEnvVars();
const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

// API route to handle the OAuth callback
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { code, state, realmId } = req.query;

    if (!code) {
        return res.status(400).json({ error: 'Authorization code is missing' });
    }

    try {
        // Exchange the authorization code for tokens
        const response = await oauthClient.createToken(`${baseUrl}/api/quickbooks/callback?code=${code}`);
        const { access_token, refresh_token, expires_in } = response.token;

        const { error } = await supabase
            .from('company')
            .update({
                quickbooks_access_token: access_token,
                quickbooks_refresh_token: refresh_token,
                quickbooks_expires_in: new Date(Date.now() + expires_in * 1000), // Set expiry time (multiply by 1000 since JS works in milliseconds and this is in seconds)
            })
            .eq('quickbooks_company_id', realmId); // Match realmId with quickbooks_company_id

        // Optionally, redirect to a success page or send a success response
        res.redirect('/profile');
        res.status(200).json({ message: 'Connected to QuickBooks successfully!' });
    } catch (error) {
        console.error('Error retrieving tokens:', error);
        res.status(500).json({ error: 'Failed to retrieve access token' });
    }
}
