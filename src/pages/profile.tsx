import { useRouter } from 'next/router';
import Head from 'next/head';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';

export default function Profile() {
    const session = useSession();
    const router = useRouter();

    console.log(session);

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

                    <Link href="/api/connect">
                        <Button className='button button-contained' variant="contained">Connect your QuickBooks</Button>
                    </Link>
                    {/* I need to save
                        - company id 
                     */}
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
        </>
    );
}
