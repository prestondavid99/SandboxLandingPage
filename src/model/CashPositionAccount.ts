import {CashPositionCardData} from "@/model/CashPositionCardData";

export class CashPositionAccount {
    accountName: string;
    accounts: CashPositionCardData[];

    constructor(name: string, accounts: CashPositionCardData[]) {
        this.accountName = name;
        this.accounts = accounts;
    }
}