import { getEnvVars } from '@/lib/env';
import { refreshQuickBooksToken } from './refresh';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const { quickbooksAccountingApi } = getEnvVars();

// Set default dates to today if not provided
const now = new Date();
const formattedDate = now.toISOString().split('T')[0]; 

// get the cashflow report from quickbooks
export async function getCashFlowReport(qbCompanyId: string) {
    const qbCashflowReportUrl = `${quickbooksAccountingApi}/v3/company/${qbCompanyId}/reports/CashFlow?start_date=${formattedDate}&end_date=${formattedDate}`;
    
    try {
        // Refresh the QuickBooks token if necessary
        const accessToken = await refreshQuickBooksToken(qbCompanyId);
        
        const response = await axios.get(qbCashflowReportUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });

        // Return the cash flow data
        return response.data;
    } catch (error) {
        console.error('Error fetching cash flow data:', error);
        throw new Error('Failed to retrieve cash flow data');
    }
}

// get the transaction list from quickbooks
export async function getTransactionList(qbCompanyId: string) {
    const qbTransactionListUrl = `${quickbooksAccountingApi}/v3/company/${qbCompanyId}/reports/TransactionList?start_date=${formattedDate}&end_date=${formattedDate}`;
    
    try {
        // Refresh the QuickBooks token if necessary
        const accessToken = await refreshQuickBooksToken(qbCompanyId);
        
        const response = await axios.get(qbTransactionListUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });

        // Return the cash flow data
        return response.data;
    } catch (error) {
        console.error('Error fetching transaction list data:', error);
        throw new Error('Failed to retrieve transaction list data');
    }
}

// get the balance sheet report from quickbooks
export async function getBalanceSheetReport(qbCompanyId: string) {
    const qbBalanceSheetReportUrl = `${quickbooksAccountingApi}/v3/company/${qbCompanyId}/reports/BalanceSheet?accounting_method=Cash&start_date=${formattedDate}&end_date=${formattedDate}`;
    
    try {
        // Refresh the QuickBooks token if necessary
        const accessToken = await refreshQuickBooksToken(qbCompanyId);
        
        const response = await axios.get(qbBalanceSheetReportUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });

        // Return the cash flow data
        return response.data;
    } catch (error) {
        console.error('Error fetching cash flow data:', error);
        throw new Error('Failed to retrieve cash flow data');
    }
}

// this function runs when the file is called through routing
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { qbCompanyId } = req.query; // Access the query parameter

    if (!qbCompanyId) {
        return res.status(400).json({ error: 'Missing qbCompanyId parameter' });
    }

    try {
        const cashFlowReport = await getCashFlowReport(qbCompanyId as string);
        const transactionList = await getTransactionList(qbCompanyId as string);
        const balanceSheetReport = await getBalanceSheetReport(qbCompanyId as string);

        const data = {
            'cashFlowReport': cashFlowReport,
            'transactionList': transactionList,
            'balanceSheetReport': balanceSheetReport,
        };
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error in API handler:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}