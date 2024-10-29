import { NextApiRequest, NextApiResponse } from 'next';
import { getEnvVars } from '@/lib/env';
import { createClient } from '@supabase/supabase-js';
import { apiProviderKey } from '@/constants/config';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { code, state, realmId } = req.query;

    if (!code) {
        return res.status(400).json({ error: 'Authorization code is missing' });
    }

    try {
        const response = await oauthClient.createToken(`${baseUrl}/api/quickbooks/callback?code=${code}`);
        const { access_token, refresh_token, expires_in } = response.token;
        const expire_datetime = new Date(Date.now() + expires_in * 1000);

        const { data } = await supabase
            .from('provider_company')
            .select('company_id')
            .eq('provider_company_id', realmId)
            .single();
        
        if (!data) {
            return res.status(400).json({ error: 'Company not found' });
        }

        const company_id = data.company_id;

        // Check for existing Access token record
        const { data: existingAccessToken } = await supabase
            .from('api_token')
            .select('*')
            .eq('type', 'Access')
            .eq('company_id', company_id)
            .eq('provider_id', apiProviderKey['quickbooks'])
            .single();

        if (existingAccessToken) {
            // Update existing Access token
            await supabase
                .from('api_token')
                .update({ token: access_token, expiration_datetime: expire_datetime })
                .eq('id', existingAccessToken.id);
        } else {
            // Insert new Access token
            const { data, error } = await supabase
                .from('api_token')
                .insert({
                    token: access_token,
                    type: 'Access',
                    expiration_datetime: expire_datetime,
                    company_id: company_id,
                    provider_id: apiProviderKey['quickbooks'],
                });

            console.log('Insert Data:', data);
            console.log('Insert Error:', error);
        }

        // Check for existing Refresh token record
        const { data: existingRefreshToken } = await supabase
            .from('api_token')
            .select('*')
            .eq('type', 'Refresh')
            .eq('company_id', company_id)
            .eq('provider_id', apiProviderKey['quickbooks'])
            .single();

        if (existingRefreshToken) {
            // Update existing Refresh token
            await supabase
                .from('api_token')
                .update({ token: refresh_token, expiration_datetime: expire_datetime })
                .eq('id', existingRefreshToken.id);
        } else {
            // Insert new Refresh token
            await supabase
                .from('api_token')
                .insert({
                    token: refresh_token,
                    type: 'Refresh',
                    expiration_datetime: expire_datetime,
                    company_id: company_id,
                    provider_id: apiProviderKey['quickbooks'],
                });
        }

        res.redirect('/profile');
        res.status(200).json({ message: 'Connected to QuickBooks successfully!' });
    } catch (error) {
        console.error('Error retrieving tokens:', error);
        res.status(500).json({ error: 'Failed to retrieve access token' });
    }
}
