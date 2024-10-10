import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from '@mui/material/Button';
import React from 'react';
import { findRow } from '@/lib/quickbooksData';
import { BalanceSheetReport, Row, ColData } from "@/types/types";

export default function Cashflow() {
    const session = useSession();
    const supabase = useSupabaseClient();
    const [error, setError] = useState<string | null>(null);

    // company info
    const [companyExists, setCompanyExists] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [quickbooksCompanyId, setQuickbooksCompanyId] = useState('');

    // quickbooks reports
    const [cashflowReport, setCashflowReport] = useState(null);
    const [transactionList, setTransactionList] = useState(null);
    const [balanceSheetReport, setBalanceSheetReport] = useState<BalanceSheetReport | null>(null);

    // financial data extracted from quickbooks reports
    const [bankBalance, setBankBalance] = useState<number | null>(null);

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
                    setCashflowReport(data.cashFlowReport);
                    setTransactionList(data.transactionList);
                    setBalanceSheetReport(data.balanceSheetReport);
                } catch {
                    console.log("Error fetching cashflow data");
                }
            }
        };
        fetchCashflowData();
    }, [companyExists, quickbooksCompanyId]);

    useEffect(() => {
        // ensure balanceSheetReport is not null
        if (balanceSheetReport) {
            console.log('##### balanceSheetReport #####');
            console.log(balanceSheetReport);

            const baRow = findRow(balanceSheetReport!.Rows.Row[0], 'Bank Accounts');
            setBankBalance(baRow.Summary.ColData[1].value);
        }
    }, [balanceSheetReport]);

    useEffect(() => {
        // ensure cashflowReport is not null
        if (cashflowReport) {
            console.log('##### cashflowReport #####');
            console.log(cashflowReport);
        }
    }, [cashflowReport]);

    useEffect(() => {
        // ensure transactionList is not null
        if (transactionList) {
            console.log('##### transactionList #####');
            console.log(transactionList);
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

                                    <h3>Sources</h3>
                                    <ul>
                                        <li>Shopify (Net of Fees): </li>
                                        <li>Paypal: </li>
                                    </ul>

                                    <h3>Uses</h3>
                                    <ul>
                                        <li>Payroll: </li>
                                        <li>Credit Card: </li>
                                        <li>Contractor ACH: </li>
                                        <li>Inventory Transfer/Loan: </li>
                                        <li>Non-Profit Transfer: </li>
                                        <li>Sales Tax: </li>
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