// import { supabase } from '@/lib/supabase/supabaseClient';
import { apiProviderKey } from '@/constants/config';
import { createClient } from '@/lib/supabase/supabaseServer';
import { plaidClient } from '@/pages/api/plaid/plaidClient';
import { AccountsGetRequest } from 'plaid';

export class PlaidBankAccountsClient {
    private accounts: any[] = [];
    private supabase = createClient();

    constructor() {}

    // query plaid for accounts
    async fetchAccounts() {
        try {
            const user = await this.supabase.auth.getUser();
            const user_id = user.data.user?.id;

            const { data: companyId, error: companyError } = await this.supabase
                .from('user_company')
                .select('company_id')
                .eq('user_id', user_id)
                .single();

            const company_id = parseInt(companyId?.company_id);
            if (isNaN(company_id)) {
                throw new Error('Invalid company ID');
            }

            const { data, error } = await this.supabase
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

            const response = await plaidClient.accountsGet(request);
            this.accounts = response.data.accounts;
            return this.accounts;
        }
        catch (error) {
            console.error('Error fetching accounts:', error);
            throw error;
        }
    }

    // get cached accounts
    getAccounts() {
        return this.accounts;
    }
}

// Usage example:
// const accountsManager = new AccountsManager();
// await accountsManager.fetchAccounts();
// const accounts = accountsManager.getAccounts();
