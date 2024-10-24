import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBank, IBankAccount, IAccountBalance } from '@/types/interfaces';

// define the shape of the state
interface BankingState {
    bankList: IBank[];
}

// Define the initial state with strict types
const initialState: BankingState = {
    bankList: [],
};

// Create the slice
const bankingSlice = createSlice({
    name: 'banking',
    initialState,
    reducers: {
        addBank: (state, action: PayloadAction<IBank>) => {
            state.bankList.push(action.payload);
        },
        removeBank: (state, action: PayloadAction<IBank>) => {
            state.bankList = state.bankList.filter(bank => bank.id !== action.payload.id);
        },
        addBankAccount: (state, action: PayloadAction<{ bankId: number; account: IBankAccount }>) => {
            const bank = state.bankList.find(bank => bank.id === action.payload.bankId);
            if (bank) {
                bank.accounts.push(action.payload.account);
            }
        },
        removeBankAccount: (state, action: PayloadAction<{ bankId: number; accountNumber: string }>) => {
            const bank = state.bankList.find(bank => bank.id === action.payload.bankId);
            if (bank) {
                bank.accounts = bank.accounts.filter(account => account.accountNumber !== action.payload.accountNumber);
            }
        },
        addAccountBalance: (state, action: PayloadAction<{ bankId: number; accountNumber: string; balance: IAccountBalance }>) => {
            const bank = state.bankList.find(bank => bank.id === action.payload.bankId);
            if (bank) {
                const account = bank.accounts.find(acc => acc.accountNumber === action.payload.accountNumber);
                if (account) {
                    account.balances.push(action.payload.balance);
                }
            }
        },
        removeAccountBalance: (state, action: PayloadAction<{ bankId: number; accountNumber: string; balanceId: number }>) => {
            const bank = state.bankList.find(bank => bank.id === action.payload.bankId);
            if (bank) {
                const account = bank.accounts.find(acc => acc.accountNumber === action.payload.accountNumber);
                if (account) {
                    account.balances = account.balances.filter(balance => balance.id !== action.payload.balanceId);
                }
            }
        },
    },
});

// Export actions
export const { 
    addBank,
    removeBank,
    addBankAccount,
    removeBankAccount,
    addAccountBalance,
    removeAccountBalance,
} = bankingSlice.actions;

// Export reducer
export default bankingSlice.reducer;
