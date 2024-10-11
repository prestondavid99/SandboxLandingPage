import { Row } from "@/types/types";

const incomeKeywordList = ['deposit', 'invoice', 'sales receipt', 'payment', 'time charge', 'charge', 'billable expense charge']
const expenseKeywordList = ['check', 'bill', 'expense', 'bill payment (check)', 'bill payment (credit card)', 'cash expense', 'credit card expense', 'refund', 'sales tax payment']

// get the user-determined income and expense sources
// TODO: enable user to CRUD their income and expense sources
const incomeSources = ['Shopify (Net of Fees)', 'Paypal'];
const expenseSources = ['Payroll', 'Credit Card', 'Contractor ACH', 'Inventory Transfer/Loan', 'Non-Profit Transfer', 'Sales Tax'];

// find a specific row in a quickbooks data object based on the header
export function findRowByHeader(row: Row, rowName: string): any | null {
    // Check if the current row contains colName
    if (row.Header && row.Header.ColData.some(col => col.value === rowName)) {
        // If found, return the row
        return row;
    }

    // Recursively search through nested rows
    if (row.Rows) {
        for (const nestedRow of row.Rows.Row) {
            const result = findRowByHeader(nestedRow, rowName);
            if (result) return result;
        }
    }

    return null;
}

// find a specific row in a quickbooks data object based on the column data
export function findRowByColData(rows: Row[], rowName: string): any[] {
    let incomeRows: any[] = [];

    // Loop through each row in the array
    for (const row of rows) {
        // Check if the current row contains the word "income"
        if (row.ColData!.some(col => col.value.toLowerCase().includes(rowName.toLowerCase()))) {
            // If found, add the row to the incomeRows array
            incomeRows.push(row);
        }

        // Recursively search through nested rows
        if (row.Rows) {
            const nestedIncomeRows = findRowByColData(row.Rows.Row, rowName.toLowerCase()); // Recursively find income rows in nested rows
            incomeRows = incomeRows.concat(nestedIncomeRows); // Combine the results
        }
    }

    return incomeRows;
}

// takes a list of transactions and returns an object with income, expense, and uncategorized transactions
function categorizeTransactions(rows: Row[]) {
    const incomeList:  Row[] = [];
    const expenseList: Row[] = [];
    const uncategorizedList: Row[] = [];

    rows.forEach((row) => {
        const type = row.ColData![1].value.toLowerCase();
        const amount = parseFloat(row.ColData![8].value);

        // Income categories
        if (incomeKeywordList.includes(type)) {
            incomeList.push(row);
        }

        // Expense categories
        else if (expenseKeywordList.includes(type)) {
            expenseList.push(row);
        }

        // Handle special cases
        else if (type === 'inventory qty adjust') {
            amount > 0 ? incomeList.push(row) : expenseList.push(row);
        }

        else {
            uncategorizedList.push(row);
        }
    });

    return { 
        income: incomeList, 
        expense: expenseList, 
        uncategorized: uncategorizedList
    };


}

// takes a list of transactions and a list of categories and returns an object with categorized transactions
function subCategorizeTransactions(transactions: Row[], categories: string[]) {
    const categorized: { [category: string]: Row[] } = {};
    
    // Initialize categories
    categories.forEach(category => {
        categorized[category] = [];
    });

      // Ensure the "Other" category exists
    categorized["Other"] = [];

    transactions.forEach(transaction => {
        const description = transaction.ColData![5].value.toLowerCase();
        let matched = false;

        for (const category of categories) {
            if (description.includes(category.toLowerCase())) {
                categorized[category].push(transaction);
                matched = true;
                break;
            }
        }

        if (!matched) {
            categorized["Other"].push(transaction);
        }
    });

    return categorized;
}

function calculateCategoryTotals(categorizedTransactions: any) {
    const totals: any[] = [];
    let idx = 0;

    for (const category in categorizedTransactions) {
        if (Array.isArray(categorizedTransactions[category])) {
            const total = categorizedTransactions[category].reduce((sum: number, transaction: any) => {
                const amount = parseFloat(transaction.ColData[8].value);
                return sum + (isNaN(amount) ? 0 : amount);
            }, 0);

            totals[idx] = [category, total];
            idx++;
        }
    }

    return totals;
}

// manages the process for parsing raw transaction data into something usable
export function parseTransactionData(transactions: Row[]) {
    const incomeExpenseCategories = categorizeTransactions(transactions);

    const incomeSubCategorized = subCategorizeTransactions(incomeExpenseCategories.income, incomeSources);
    const expenseSubCategorized = subCategorizeTransactions(incomeExpenseCategories.expense, expenseSources);
    console.log(incomeSubCategorized, expenseSubCategorized);

    const incomeTotals = calculateCategoryTotals(incomeSubCategorized);
    const expenseTotals = calculateCategoryTotals(expenseSubCategorized);

    const data = [
        ['income', incomeTotals],
        ['expense', expenseTotals],
    ];

    return data;
}