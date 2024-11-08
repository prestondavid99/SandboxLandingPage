export class CashPositionCardData {
    accountName: string
    accountId: number;
    openingBalance: number;
    trend: number;
    closingBalance: number;

    constructor(accountName: string, account: number, openingBalance: number, trend: number, closingBalance: number) {
        this.accountName = accountName;
        this.accountId = account;
        this.openingBalance = openingBalance;
        this.trend = trend;
        this.closingBalance = closingBalance;
    }
}