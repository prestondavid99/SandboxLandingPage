// interfaces are used to define the shape of objects
// they are not the objects themselves, they are the descriptions of objects

// ##########################
// ### Settings Interface ###
// ##########################

export interface IPeriod {
    type: 'daily' | 'weekly' | 'quarterly' | 'yearly' | 'custom';
    openingDate: string;
    closingDate: string;
}


// #############################
// ##### Banking Interface #####
// #############################

export interface IBank {
    id: number;                             // ID of the bank
    name: string;                           // Name of the bank
}

export interface IBankAccount {
    id: number;
    bankId: number;                         // Foreign key reference to the Bank table
    accountNumber: string;                  // Account number (stored as a string) serves as the identifier
    accountType: "checking" | "savings";    // Enum for account type
}

export interface IAccountBalance {
    id: number;                             // ID of the account balance
    bankAccountNumber: string;              // Foreign key reference to the Bank Account table
    balance: number;                        // Balance of the account
    date: Date;                             // Date of the balance
}


// #############################
// ####### API Interface #######
// #############################

export interface IApiToken {
    id: number;
    token: string;
    type: 'Access' | 'Refresh';
    providerId: number
    expirationDatetime: Date | null;
}

export interface IApi {
    id: number;
    tokens: IApiToken[];
}