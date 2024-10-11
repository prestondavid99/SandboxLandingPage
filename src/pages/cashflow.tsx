import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from '@mui/material/Button';
import React from 'react';
import { findRowByHeader, findRowByColData, categorizeTransactions, subCategorizeTransactions } from '@/lib/quickbooksData';
import { Row } from "@/types/types";

export default function Cashflow() {
    const session = useSession();
    const supabase = useSupabaseClient();
    const [error, setError] = useState<string | null>(null);
    const today = new Date();

    // company info
    const [companyExists, setCompanyExists] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [quickbooksCompanyId, setQuickbooksCompanyId] = useState('');

    // quickbooks reports
    const [balanceSheetReport, setBalanceSheetReport] = useState<any | null>(null);
    const [profitAndLossReport, setProfitAndLossReport] = useState<any | null>(null);
    const [cashflowReport, setCashflowReport] = useState<any | null>(null);
    const [transactionList, setTransactionList] = useState<any | null>(null);

    // financial data extracted from quickbooks reports
    const [bankBalance, setBankBalance] = useState<number | null>(null);

    // get the user-determined income and expense sources
    // TODO: enable user to CRUD their income sources and expense sources
    const incomeSources = ['Shopify (Net of Fees)', 'Paypal', 'Other Income'];
    const expenseSources = ['Payroll', 'Credit Card', 'Contractor ACH', 'Inventory Transfer/Loan', 'Non-Profit Transfer', 'Sales Tax', 'Other Expense'];

    // check if the user belongs to a company
    useEffect(() => {
        const checkCompany = async () => {
            if (session) {
                const { data, error } = await supabase
                    .from('user_company')
                    .select('company_id')
                    .eq('user_id', session.user.id)
                    .single();

                if (data) {
                    setCompanyExists(true);
                    const companyData = await supabase
                        .from('company')
                        .select('name, quickbooks_company_id, id')
                        .eq('id', data.company_id)
                        .single();

                    if (companyData.data) {
                        setQuickbooksCompanyId(companyData.data.quickbooks_company_id);
                        setCompanyName(companyData.data.name);
                    }
                } else {
                    setCompanyExists(false);
                }
            }
        };
        checkCompany();
    }, [session, supabase]);

    // Fetch financial data when the company is found
    useEffect(() => {
        const fetchCashflowData = async () => {
            if (companyExists && quickbooksCompanyId) {
                try {
                    const response = await fetch(`/api/quickbooks/reports?qbCompanyId=${quickbooksCompanyId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch cashflow data');
                    }
                    const data = await response.json();
                    setProfitAndLossReport(data.profitAndLossReport);
                    setBalanceSheetReport(data.balanceSheetReport);
                    setCashflowReport(data.cashFlowReport);
                    setTransactionList(data.transactionList);
                } catch {
                    console.log("Error fetching cashflow data");
                }
            }
        };
        fetchCashflowData();
    }, [companyExists, quickbooksCompanyId]);

    useEffect(() => {
        // ensure profitAndLossReport is not null
        if (profitAndLossReport) {
            // console.log('##### profitAndLossReport #####');
            // console.log(profitAndLossReport);
        }
    }, [profitAndLossReport]);

    useEffect(() => {
        // ensure balanceSheetReport is not null
        if (balanceSheetReport) {
            // extract the data for our cashflow report
            const baRow = findRowByHeader(balanceSheetReport!.Rows.Row[0], 'Bank Accounts');
            setBankBalance(baRow.Summary.ColData[1].value);
        }
    }, [balanceSheetReport]);

    useEffect(() => {
        // ensure cashflowReport is not null
        if (cashflowReport) {
            // console.log('##### cashflowReport #####');
            // console.log(cashflowReport);
        }
    }, [cashflowReport]);

    useEffect(() => {
        // ensure transactionList is not null
        if (transactionList) {
            // console.log('##### transactionList #####');
            // console.log(transactionList);
            const incomeRowList = findRowByColData(transactionList!.Rows.Row, 'income');
            console.log(transactionList!.Rows.Row);
            console.log('incomeRowList');
            console.log(incomeRowList);

            const categorizedTransactions = categorizeTransactions(transactionList!.Rows.Row);
            console.log('categorizedTransactions');
            console.log(categorizedTransactions);

            const incomeSubCategorized = subCategorizeTransactions(categorizedTransactions.income, incomeSources);
            console.log('incomeSubCategorized');
            console.log(incomeSubCategorized);

            const expenseSubCategorized = subCategorizeTransactions(categorizedTransactions.expense, expenseSources);
            console.log('expenseSubCategorized');
            console.log(expenseSubCategorized);
        }
    }, [transactionList]);

    return (
        <>
            <Head>
                <title>Cashflow Dashboard</title>
                <meta name="description" content="Your cashflow dashboard" />
            </Head>

            {session ? (
                <>
                    {companyExists ? (
                        <>
                            <h1>{companyName}'s Cashflow Dashboard</h1>
                            {cashflowReport ? (
                                <>
                                    <h2>Cashflow Report</h2>
                                    <p>{today.toDateString()}</p>

                                    <h3>Income</h3>
                                    <ul>
                                    {
                                        incomeSources.map((source) => {
                                            return (
                                                <li>{source}: </li>
                                            );
                                        })
                                    }
                                    </ul>

                                    <h3>Expenses</h3>
                                    <ul>
                                    {
                                        expenseSources.map((source) => {
                                            return (
                                                <li>{source}: </li>
                                            );
                                        })
                                    }
                                    </ul>

                                    <h3>Cash Balance</h3>
                                    <ul>
                                        <li>Total Bank Balance: ${bankBalance}</li>
                                    </ul>
                                </>
                            ) : error ? (
                                <p>Error fetching cashflow data: {error}</p>
                            ) : (
                                <p>Loading cashflow data...</p>
                            )}
                        </>
                    ) : (
                        <>
                            <h1>Cashflow Dashboard</h1>
                            <p>Link your QuickBooks account</p>
                            <Link href="/profile">
                                <Button className='button button-contained' variant="contained">Profile Settings</Button>
                            </Link>
                        </>
                    )}
                    
                </>
            ): (
                <>
                    <h1>Cashflow Dashboard</h1>
                    <p>Log in to view your profile</p>
                    <Link href="/signup">
                        <Button className='button button-contained' variant="contained">Log in</Button>
                    </Link>
                </>
            )}
        </>
    )
}