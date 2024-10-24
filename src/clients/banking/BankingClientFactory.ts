// BankingClientFactory.ts

import { IBankingClient } from './IBankingClient';
//import { PlaidBankingClient } from './PlaidBankingClient';
//import { AnotherBankingClient } from './AnotherBankingClient';

export const createBankingClient = (provider: 'plaid' | 'another'): IBankingClient => {
    switch (provider) {
        case 'plaid':
            //return new PlaidBankingClient('https://api.plaid.com');
        case 'another':
            //return new AnotherBankingClient('https://api.anotherbank.com');
        default:
            throw new Error('Unknown banking provider');
    }
};
