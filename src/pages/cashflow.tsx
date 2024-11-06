import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from '@mui/material/Button';
import React from 'react';
import { findRowByHeader, parseTransactionData } from '@/lib/quickbooksData';
import useCompanyExists from '@/lib/hooks/useCompanyExists';
import useQuickBooksConnection from '@/lib/hooks/useQuickBooksConnection';
import useUserSession from '@/lib/hooks/useUserSession';
import { supabase } from '@/lib/supabase/supabaseClient';

export default function Cashflow() {
    const { user, session } = useUserSession();
    const [error, setError] = useState<string | null>(null);
    const today = new Date();

    // quickbooks reports
    const [balanceSheetReport, setBalanceSheetReport] = useState<any | null>(null);
    const [profitAndLossReport, setProfitAndLossReport] = useState<any | null>(null);
    const [cashflowReport, setCashflowReport] = useState<any | null>(null);
    const [transactionList, setTransactionList] = useState<any | null>(null);

    // financial data extracted from quickbooks reports
    const [bankBalance, setBankBalance] = useState<number | null>(null);
    const [transactionData, setTransactionData] = useState<any | null>(null);

    // check if the user belongs to a company
    const { companyExists, companyName, companyId } = useCompanyExists(session);
    const { quickbooksCompanyId } = useQuickBooksConnection(session, companyId);

    const [plaidData, setPlaidData] = useState<any | null>(null);

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

    // fetch plaid data
    useEffect(() => {
        const fetchPlaidData = async () => {
            const response = await fetch(`/api/plaid/endpoints?companyId=${companyId}`);
            const data = await response.json();
            setPlaidData(data);

            console.log('Plaid data: ', data);

        }
        fetchPlaidData();
    }, [companyId]);

    // extract the bank balance from the balance sheet report
    useEffect(() => {
        // ensure balanceSheetReport is not null
        if (balanceSheetReport) {
            // extract the data for our cashflow report
            const baRow = findRowByHeader(balanceSheetReport!.Rows.Row[0], 'Bank Accounts');
            setBankBalance(baRow.Summary.ColData[1].value);
        }
    }, [balanceSheetReport]);

    // extract the transaction data from the transaction list
    useEffect(() => {
        // ensure transactionList is not null
        if (transactionList && transactionList != undefined) {
            const transactionData = parseTransactionData(transactionList!.Rows.Row);
            setTransactionData(transactionData);
        }
    }, [transactionList]);

    return (
        <>
            <Head>
                <title>Cashflow Dashboard</title>
                <meta name="description" content="Your cashflow dashboard" />
            </Head>

            {companyExists ? (
                <>
                    <pre>{JSON.stringify(plaidData, null, 2)}</pre>
                </>
            ) : (
                <>
                    <h1>Cashflow Dashboard</h1>
                    <p>Create a company to get started</p>
                    <Link href="/profile">
                        <Button className='button button-contained' variant="contained">Profile Settings</Button>
                    </Link>
                </>
            )}
        </>
    )
}