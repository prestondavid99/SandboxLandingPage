import { PlaidBankAccountsClient } from "@/lib/clients/plaid/plaidBankAccountClient";
import { IAccountCashPosition } from "@/types/interfaces";

// initialize account clients
const plaidBankAccountsClient = new PlaidBankAccountsClient();

export class BankAccountsClient {
    private accountCashPositions: IAccountCashPosition[] = [];

    constructor() {}

    // query apis for accounts
    async fetchAccounts() {
        const plaidAccounts = await plaidBankAccountsClient.fetchAccounts();
        this.accountCashPositions.push(...plaidAccounts);
        
        return this.accountCashPositions;
    }

    // get accounts from saved list
    getAccounts() {
        const plaidAccounts = plaidBankAccountsClient.getAccounts();
        this.accountCashPositions.push(...plaidAccounts);
        
        return this.accountCashPositions;
    }
}