import { AccountsGetRequest } from 'plaid';
import { supabase } from '@/lib/supabase/supabaseClient';
import { apiProviderKey } from '@/constants/config';
import { NextApiRequest, NextApiResponse } from 'next';
import { plaidClient } from './plaidClient';

export async function getAccounts(companyId: string) {
    try {
        const company_id = parseInt(companyId);
        if (isNaN(company_id)) {
            throw new Error('Invalid company ID');
        }

        const { data, error } = await supabase
            .from('api_token')
            .select('token')
            .eq('type', 'Access')
            .eq('provider_id', apiProviderKey['plaid'])
            .eq('company_id', company_id)
            .single();

        if (error) {
            console.error('Error fetching accounts:', error);
            throw new Error('Failed to retrieve account data');
        }

        const plaid_access_token = data.token;
        const request: AccountsGetRequest = {
            access_token: plaid_access_token,
        };
        console.log('Request:', request);
        const response = await plaidClient.accountsGet(request);
        const accounts = response.data.accounts;
        console.log('Accounts:', accounts);
        return accounts;
    }
    catch (error) {
        console.error('Error fetching accounts:', error);
        throw error; // Throw the original error for more detailed error handling
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { companyId } = req.query; // Access the query parameter

    if (!companyId) {
        return res.status(400).json({ error: 'Missing companyId parameter' });
    }

    try {
        const accounts = await getAccounts(companyId as string);
        return res.status(200).json(accounts);
    } catch (error) {
        console.error('Error in plaid API handler:', error);
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}