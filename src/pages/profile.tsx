import Head from 'next/head';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import PLink from '@/components/plaid/PLink';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import useCompanyExists from '@/lib/hooks/useCompanyExists';
import useQuickBooksConnection from '@/lib/hooks/useQuickBooksConnection';
import { apiProviderKey } from '@/constants/config';

export default function Profile() {
    const session = useSession();
    const supabase = useSupabaseClient();
    
    // Using the custom hook
    const { companyExists, companyName, companyId } = useCompanyExists(session);
    const { quickbooksCompanyId, qbExpiresAt } = useQuickBooksConnection(session, companyId);

    const [newCompanyId, setNewCompanyId] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [companyNameInput, setCompanyNameInput] = useState(companyName);
    const [quickbooksCompanyIdInput, setQuickbooksCompanyIdInput] = useState(quickbooksCompanyId);

    const currentDateTime = new Date();
    const tokenIsExpired = qbExpiresAt ? currentDateTime.getTime() >= new Date(qbExpiresAt).getTime() : true;

    const handleCreateCompany = async () => {
        if (!companyNameInput || !quickbooksCompanyIdInput) {
            setOpenSnackbar(true);
            return;
        }

        const { data, error } = await supabase
            .from('company')
            .insert([{
                name: companyNameInput
            }])
            .select('id');

        if (data) {
            const newCompanyId = data[0].id;
            await supabase
                .from('user_company')
                .insert([{ user_id: session?.user.id, company_id: newCompanyId }]);
                setNewCompanyId(newCompanyId);

            await supabase
                .from ('provider_company')
                .insert([{ provider_id: apiProviderKey['quickbooks'], company_id: newCompanyId, provider_company_id: quickbooksCompanyIdInput }]);
        } else {
            console.error('Error creating company:', error);
        }
    };

    const handleUpdateCompany = async () => {
        if (!companyId || !companyNameInput || !quickbooksCompanyIdInput) {
            setOpenSnackbar(true);
            return;
        }

        const { data, error } = await supabase
            .from('company')
            .update({
                name: companyNameInput
            })
            .eq('id', companyId)
            .select('id');

        if (data) {
            await supabase
                .from ('provider_company')
                .update({ provider_company_id: quickbooksCompanyIdInput })
                .eq('provider_id', apiProviderKey['quickbooks'])
                .eq('company_id', companyId);

            setIsEditing(false); // Exit edit mode after update
        } else {
            console.error('Error updating company:', error);
        }
    };

    return (
        <>
            <Head>
                <title>Profile Information</title>
                <meta name="description" content="View and edit your profile information" />
            </Head>
            {session ? (
                <>
                    <h1>{session.user.user_metadata.full_name}'s Profile</h1>
                    <PLink />

                    {companyExists ? (
                        <>
                            <h2>Company Information</h2>
                            {isEditing ? (
                                <>
                                    <TextField
                                        label="Company Name"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        defaultValue={companyName}
                                        onChange={(e) => setCompanyNameInput(e.target.value)}
                                    />
                                    <TextField
                                        label="QuickBooks Company ID"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        defaultValue={quickbooksCompanyId}
                                        onChange={(e) => setQuickbooksCompanyIdInput(e.target.value)}
                                    />
                                    <Button
                                        className='button button-contained'
                                        variant="contained"
                                        onClick={handleUpdateCompany}
                                    >
                                        Update Company
                                    </Button>
                                    <Button
                                        className='button button-contained'
                                        variant="contained"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <p><strong>Name:</strong> {companyName}</p>
                                    <p><strong>QuickBooks Company ID:</strong> {quickbooksCompanyId}</p>
                                    <Button
                                        className='button button-contained'
                                        variant="contained"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Edit
                                    </Button>
                                </>
                            )}
                            <br/>
                            {!tokenIsExpired ? (
                                <p>Your QuickBooks is Connected</p>
                            ) : (
                                <Link href="/api/quickbooks/connect">
                                    <Button
                                        className='button button-contained'
                                        variant="contained"
                                    >
                                        Connect Your QuickBooks
                                    </Button>
                                </Link>
                            )}
                        </>
                    ) : (
                        <>
                            <h2>Create a Company</h2>
                            <TextField
                                label="Company Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={companyNameInput}
                                onChange={(e) => setCompanyNameInput(e.target.value)}
                            />
                            <TextField
                                label="QuickBooks Company ID"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={quickbooksCompanyIdInput}
                                onChange={(e) => setQuickbooksCompanyIdInput(e.target.value)}
                            />
                            <Button
                                className='button button-contained'
                                variant="contained"
                                onClick={handleCreateCompany}
                            >
                                Create Company
                            </Button>
                        </>
                    )}
                </>
            ) : (
                <>
                    <h1>Profile</h1>
                    <p>Log in to view your profile</p>
                    <Link href="/signup">
                        <Button className='button button-contained' variant="contained">Log in</Button>
                    </Link>
                </>
            )}

            <Snackbar
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                message="Please fill in all fields."
                autoHideDuration={3000}
            />
        </>
    );
}
