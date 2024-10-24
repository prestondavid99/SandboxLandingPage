// BankingClient.ts

import { IBankingClient } from '../IBankingClient';
import { IBank, IBankAccount, IAccountBalance } from '@/types/interfaces';

export class BankingClient implements IBankingClient {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async getBanks(): Promise<IBank[]> {
        const response = await fetch(`${this.apiUrl}/banks`);
        return response.json();
    }

    async getBankById(id: number): Promise<IBank | null> {
        const response = await fetch(`${this.apiUrl}/banks/${id}`);
        return response.ok ? response.json() : null;
    }

    async addBank(bank: IBank): Promise<void> {
        await fetch(`${this.apiUrl}/banks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bank),
        });
    }

    async removeBank(id: number): Promise<void> {
        await fetch(`${this.apiUrl}/banks/${id}`, { method: 'DELETE' });
    }

    async getAccounts(bankId: number): Promise<IBankAccount[]> {
        const response = await fetch(`${this.apiUrl}/banks/${bankId}/accounts`);
        return response.json();
    }

    async addAccount(account: IBankAccount): Promise<void> {
        await fetch(`${this.apiUrl}/accounts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(account),
        });
    }

    async removeAccount(accountNumber: string): Promise<void> {
        await fetch(`${this.apiUrl}/accounts/${accountNumber}`, { method: 'DELETE' });
    }

    async getAccountBalances(accountNumber: string): Promise<IAccountBalance[]> {
        const response = await fetch(`${this.apiUrl}/accounts/${accountNumber}/balances`);
        return response.json();
    }

    async addAccountBalance(balance: IAccountBalance): Promise<void> {
        await fetch(`${this.apiUrl}/balances`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(balance),
        });
    }

    async removeAccountBalance(balanceId: number): Promise<void> {
        await fetch(`${this.apiUrl}/balances/${balanceId}`, { method: 'DELETE' });
    }
}
