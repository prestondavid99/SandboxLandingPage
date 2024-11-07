// import { supabase } from '@/lib/supabase/supabaseClient';
import { apiProviderKey } from '@/constants/config';
import { createClient } from '@/lib/supabase/supabaseServer';
import { plaidClient } from '@/pages/api/plaid/plaidClient';
import { AccountsGetRequest } from 'plaid';
import { IAccountCashPosition } from '@/types/interfaces';

export class PlaidBankAccountsClient {
    private accounts: any[] = [];
    private accountCashPositions: IAccountCashPosition[] = [];
    private supabase = createClient();

    constructor() {}

    private calculateTrend(openingBalance: number, closingBalance: number): number {
        return (closingBalance - openingBalance) / openingBalance * 100;
    }

    // transform plaid account to IAccountCashPosition format
    private transformPlaidAccount(account: any): IAccountCashPosition {
        return {
            bankName: account.official_name || account.name,    // TODO: add bank name 
            accountNumber: account.mask,                        // Last 4 digits of account number
            openingBalance: account.balances.current || 0,      // TODO: set opening balance based on period
            closingBalance: account.balances.current || 0,      // assuming the period ends today
            trend: this.calculateTrend(account.balances.available, account.balances.current)
        };
    }

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

            if (companyError) {
                console.error('Error fetching company:', companyError);
                throw new Error('Failed to retrieve company data');
            }

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
            this.accountCashPositions = response.data.accounts.map(account => 
                this.transformPlaidAccount(account)
            );
            return this.accountCashPositions;
        }
        catch (error) {
            console.error('Error fetching accounts:', error);
            throw error;
        }
    }

    // get saved accounts
    getAccounts() {
        return this.accountCashPositions;
    }
}
