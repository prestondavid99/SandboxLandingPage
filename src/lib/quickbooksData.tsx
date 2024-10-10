import { BalanceSheetReport, ColData, Row } from "@/types/types";

// find a specific row in a quickbooks data object
export function findRow(row: Row, rowName: string): any | null {
    // Check if the current row contains colName
    if (row.Header && row.Header.ColData.some(col => col.value === rowName)) {
        // If found, return the row
        return row;
    }

    // Recursively search through nested rows
    if (row.Rows) {
        for (const nestedRow of row.Rows.Row) {
            const result = findRow(nestedRow, rowName);
            if (result) return result;
        }
    }

    return null;
}