import { PlaidBankAccountsClient } from "@/lib/clients/plaid/plaidBankAccountClient";

const plaidBankAccountsClient = new PlaidBankAccountsClient();

export class BankAccountsClient {
    private accounts: any[] = [];

    constructor() {}

    // query apis for accounts
    async fetchAccounts() {
        const plaidAccounts = await plaidBankAccountsClient.fetchAccounts();
        this.accounts.push(...plaidAccounts);
        
        return this.accounts;
    }

    // get accounts from cache
    getAccounts() {
        const plaidAccounts = plaidBankAccountsClient.getAccounts();
        this.accounts.push(...plaidAccounts);
        
        return this.accounts;
    }
}