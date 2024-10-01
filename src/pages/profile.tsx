import { useRouter } from 'next/router';
import Head from 'next/head';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';

export default function Profile() {
    const session = useSession();
    const router = useRouter();
    const supabase = useSupabaseClient();
    const [companyExists, setCompanyExists] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [quickbooksCompanyId, setQuickbooksCompanyId] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [isEditing, setIsEditing] = useState(false); // State for tracking edit mode

    useEffect(() => {
        const checkCompany = async () => {
            if (session) {
                const { data, error } = await supabase
                    .from('user_company')
                    .select('company_id')
                    .eq('user_id', session.user.id) // Make sure you have the correct user id field
                    .single();

                if (data) {
                    setCompanyExists(true);
                    const companyData = await supabase
                        .from('company')
                        .select('name, quickbooks_company_id, id')
                        .eq('id', data.company_id)
                        .single();

                    if (companyData.data) {
                        setCompanyName(companyData.data.name);
                        setQuickbooksCompanyId(companyData.data.quickbooks_company_id);
                        setCompanyId(companyData.data.id);
                    }
                } else {
                    setCompanyExists(false);
                }
            }
        };
        checkCompany();
    }, [session, supabase]);

    const handleCreateCompany = async () => {
        if (!companyName || !quickbooksCompanyId) {
            setOpenSnackbar(true);
            return;
        }

        const { data, error } = await supabase
            .from('company')
            .insert([{ 
                quickbooks_company_id: quickbooksCompanyId,
                name: companyName
            }])
            .select('id');

        if (data) {
            const newCompanyId = data[0].id;
            await supabase
                .from('user_company')
                .insert([{ user_id: session?.user.id, company_id: newCompanyId }]);
            setCompanyExists(true);
            setCompanyId(newCompanyId);
        } else {
            console.error('Error creating company:', error);
        }
    };

    const handleUpdateCompany = async () => {
        if (!companyId || !companyName || !quickbooksCompanyId) {
            setOpenSnackbar(true);
            return;
        }

        const { data, error } = await supabase
            .from('company')
            .update({
                name: companyName,
                quickbooks_company_id: quickbooksCompanyId
            })
            .eq('id', companyId)
            .select('id');

        if (data) {
            console.log('Company updated successfully:', data);
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
                    <p>{session.user.user_metadata.full_name}</p>

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
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                    />
                                    <TextField
                                        label="QuickBooks Company ID"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={quickbooksCompanyId}
                                        onChange={(e) => setQuickbooksCompanyId(e.target.value)}
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
                        </>
                    ) : (
                        <>
                            <h2>Create a Company</h2>
                            <TextField
                                label="Company Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                            <TextField
                                label="QuickBooks Company ID"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={quickbooksCompanyId}
                                onChange={(e) => setQuickbooksCompanyId(e.target.value)}
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
