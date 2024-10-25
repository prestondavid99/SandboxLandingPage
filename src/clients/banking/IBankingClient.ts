// IBankingClient.ts
// Interface for all banking clients

import { IBank, IBankAccount, IAccountBalance } from '@/types/interfaces';

export interface IBankingClient {
    getBanks(): Promise<IBank[]>; // Fetch all banks
    getBankById(id: number): Promise<IBank | null>; // Fetch a bank by ID
    addBank(bank: IBank): Promise<void>; // Add a new bank
    removeBank(id: number): Promise<void>; // Remove a bank by ID
    
    getAccounts(bankId: number): Promise<IBankAccount[]>; // Fetch accounts for a specific bank
    addAccount(account: IBankAccount): Promise<void>; // Add a new bank account
    removeAccount(accountNumber: string): Promise<void>; // Remove an account by account number
    
    getAccountBalances(accountNumber: string): Promise<IAccountBalance[]>; // Fetch balances for a specific account
    addAccountBalance(balance: IAccountBalance): Promise<void>; // Add a new account balance
    removeAccountBalance(balanceId: number): Promise<void>; // Remove an account balance by ID
}
