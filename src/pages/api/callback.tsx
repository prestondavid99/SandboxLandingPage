// pages/api/callback.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getEnvVars } from '../../lib/env';

export default async function callback(req: NextApiRequest, res: NextApiResponse) {
    const { code } = req.query; // Get the authorization code from the query parameters
    const { baseUrl,quickbooksClientId, quickbooksSecretKey, quickbooksAccountingApi } = getEnvVars();

    // Step 1: Exchange the authorization code for an access token
    try {
        const tokenResponse = await axios.post(`${quickbooksAccountingApi}/oauth2/v1/tokens/bearer`, null, {
            params: {
                grant_type: 'authorization_code',
                code,
                redirect_uri: `${baseUrl}/api/callback`, // Match this with the one used in connect
            },
            auth: {
                username: quickbooksClientId!,
                password: quickbooksSecretKey!,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const { access_token, refresh_token } = tokenResponse.data;

        // Step 2: Save the tokens to the user's session or database
        // Depending on your setup, you may want to store these in a user session or database.
        // For example:
        // await supabase.from('users').update({ NEXT_PUBLIC_QUICKBOOKS_access_token: access_token, NEXT_PUBLIC_QUICKBOOKS_refresh_token: refresh_token }).eq('id', session.user.id);

        return res.redirect('/profile'); // Redirect back to the profile page
    } catch (error) {
        console.error('Error exchanging token:', error);
        return res.status(500).json({ error: 'Failed to exchange token.' });
    }
}
