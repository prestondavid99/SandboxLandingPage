import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { useEnv } from '../components/wrappers/context/EnvContext';
import SignOutButton from "@/components/auth/SignOutButton";
import EmbedGoogleSheet from "@/components/goog/EmbedGoogleSheet";

export default function Profile() {
    const session = useSession();
    const supabase = useSupabaseClient();
    const { quickbooksAccountingApi } = useEnv();

    const [companyExists, setCompanyExists] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [quickbooksCompanyId, setQuickbooksCompanyId] = useState('');

    const [cashflowData, setCashflowData] = useState(null);
    const [error, setError] = useState(null);

    // quickbooks endpoint for the cashflow report
    const qb_cashflow_report_endpoint = `${quickbooksAccountingApi}/v3/company/${quickbooksCompanyId}/reports/CashFlow`;

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

    useEffect(() => {
        const fetchCashflowReport = async () => {
            if (quickbooksCompanyId) {
                try {
                    const accessToken = 'TODO: YOUR_QUICKBOOKS_ACCESS_TOKEN'; // Replace with actual token
                    const response = await axios.get(qb_cashflow_report_endpoint, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Accept': 'application/json'
                        }
                    });

                    setCashflowData(response.data);
                } catch (err: any) {
                    setError(err.message);
                }
            }
        };

        if (quickbooksCompanyId) {
            fetchCashflowReport();
        }
    }, [quickbooksCompanyId, qb_cashflow_report_endpoint]);

    return (
        <>
            <Head>
                <title>Cashflow Dashboard</title>
                <meta name="description" content="Your cashflow dashboard" />
            </Head>

            {session ? (

                <>
                    <EmbedGoogleSheet/>
                    {companyExists ? (
                        <>
                            <h1>{companyName}'s Cashflow Dashboard</h1>
                            {cashflowData ? (
                                <pre>{JSON.stringify(cashflowData, null, 2)}</pre>
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