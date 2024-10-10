import React from "react";
import { getEnvVars } from "@/lib/env";
import { Row } from "@/types/types";

interface BalanceSheetProps {
    balanceSheet: any;
}

function findBankAccounts(row: Row): any | null {
    // Check if the current row contains "Bank Accounts"
    if (row.Header && row.Header.ColData.some(col => col.value === "Bank Accounts")) {
        // If found, return the balances under "Bank Accounts"
        return row.Rows?.Row.map(r => ({
            account: r.ColData?.[0]?.value,
            balance: r.ColData?.[1]?.value,
        }));
    }

    // Recursively search through nested rows
    if (row.Rows) {
        for (const nestedRow of row.Rows.Row) {
            const result = findBankAccounts(nestedRow);
            if (result) return result;
        }
    }

    return null;
}

function BalanceSheet({ balanceSheet }: BalanceSheetProps) {

    const bankAccounts = findBankAccounts(balanceSheet.Rows.Row[0]);
    console.log('########## bankAccounts ##########');
    console.log(bankAccounts);

    return (
        <>
            Balance Sheet Component
        </>
    );
}

export default BalanceSheet;
