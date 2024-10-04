import { createClient } from '@supabase/supabase-js';
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
    // Fetch the company's QuickBooks tokens and expiration time from the database
    const { data, error } = await supabase
        .from('company')
        .select('quickbooks_access_token, quickbooks_refresh_token, quickbooks_expires_at')
        .eq('quickbooks_company_id', qbCompanyId)
        .single();

    if (error) {
        console.error('Error fetching company tokens:', error);
        throw new Error('Unable to fetch company tokens');
    }

    const { quickbooks_access_token, quickbooks_refresh_token, quickbooks_expires_at } = data;
    const now = new Date();
    const expiresAt = new Date(quickbooks_expires_at);

    // If the token has expired, refresh it using the refresh token
    if (expiresAt <= now) {
        try {
            const tokenResponse = await oauthClient.refreshUsingToken(quickbooks_refresh_token);
            const { access_token, refresh_token, expires_in } = tokenResponse.token;

            // Update the company record with the new tokens and expiration time
            const { error } = await supabase
                .from('company')
                .update({
                    quickbooks_access_token: access_token,
                    quickbooks_refresh_token: refresh_token,
                    quickbooks_expires_at: new Date(Date.now() + expires_in * 1000),
                })
                .eq('quickbooks_company_id', qbCompanyId);

            if (error) {
                console.error('Error updating company tokens:', error);
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