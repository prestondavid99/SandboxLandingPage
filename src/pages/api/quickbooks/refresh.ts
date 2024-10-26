import { createClient } from '@supabase/supabase-js';
import { getEnvVars } from '@/lib/env';
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

/**
 * Refreshes the QuickBooks access token for a given company if it has expired.
 * 
 * @param {string} qbCompanyId - The QuickBooks company ID of the company whose tokens are being refreshed.
 * @returns {Promise<string>} - Returns the current or refreshed access token.
 * @throws Will throw an error if fetching or updating tokens fails.
 */
export const refreshQuickBooksToken = async (qbCompanyId: string) => {
    // Fetch the Access and Refresh tokens and their expiration time from the `api_token` table
    const { data: accessData, error: accessError } = await supabase
        .from('api_token')
        .select('token, expiration_datetime')
        .eq('company_id', qbCompanyId)
        .eq('provider_id', apiProviderKey['quickbooks'])
        .eq('type', 'Access')
        .single();

    const { data: refreshData, error: refreshError } = await supabase
        .from('api_token')
        .select('token')
        .eq('company_id', qbCompanyId)
        .eq('provider_id', apiProviderKey['quickbooks'])
        .eq('type', 'Refresh')
        .single();

    if (accessError || refreshError || !accessData || !refreshData) {
        console.error('Error fetching tokens:', accessError || refreshError);
        throw new Error('Unable to fetch company tokens');
    }

    const { token: quickbooks_access_token, expiration_datetime } = accessData;
    const { token: quickbooks_refresh_token } = refreshData;
    const now = new Date();
    const expiresAt = new Date(expiration_datetime);

    // If the access token has expired, refresh it using the refresh token
    if (expiresAt <= now) {
        try {
            const tokenResponse = await oauthClient.refreshUsingToken(quickbooks_refresh_token);
            const { access_token, refresh_token, expires_in } = tokenResponse.token;
            const newExpiration = new Date(Date.now() + expires_in * 1000);

            // Update the `api_token` table with the new access and refresh tokens and expiration time
            const { error: updateAccessError } = await supabase
                .from('api_token')
                .update({
                    token: access_token,
                    expiration_datetime: newExpiration,
                })
                .eq('company_id', qbCompanyId)
                .eq('provider_id', apiProviderKey['quickbooks'])
                .eq('type', 'Access');

            const { error: updateRefreshError } = await supabase
                .from('api_token')
                .update({
                    token: refresh_token,
                })
                .eq('company_id', qbCompanyId)
                .eq('provider_id', apiProviderKey['quickbooks'])
                .eq('type', 'Refresh');

            if (updateAccessError || updateRefreshError) {
                console.error('Error updating tokens:', updateAccessError || updateRefreshError);
                throw new Error('Unable to update company tokens');
            }

            return access_token;
        } catch (err) {
            console.error('Error refreshing QuickBooks token:', err);
            throw new Error('Failed to refresh QuickBooks token');
        }
    } else {
        return quickbooks_access_token;
    }
};
