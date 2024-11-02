// pages/_app.tsx

import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { createPagesBrowserClient, SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, useSessionContext } from '@supabase/auth-helpers-react';
import { wrapper } from '../store';
import { Provider, useDispatch } from 'react-redux';
import { getEnvVars } from '@/lib/env';
import { fetchUserCompany } from '@/store/slices/companySlice';
import { AppDispatch } from '@/store';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

import '@/styles/style.css';
import '@/styles/pages/signup.css';
import '@/styles/components/auth/oauth-login-button.css';

function AppContent({ Component, pageProps, router }: AppProps) { // Add router prop
    const { session } = useSessionContext();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (session?.user?.id) {
            dispatch(fetchUserCompany(session.user.id));
        }
    }, [session, dispatch]);

    return (
        <>
            <Navbar />
            <main>
                <Component {...pageProps} router={router} /> {/* Pass router to the component */}
            </main>
            <Footer />
        </>
    );
}

function MyApp({ Component, pageProps, router }: AppProps) { // Include router here
    const { store } = wrapper.useWrappedStore({ pageProps });
    const { supabaseUrl, supabaseAnonKey } = getEnvVars();

    const [supabaseClient] = useState<SupabaseClient>(() =>
        createPagesBrowserClient({
            supabaseUrl: supabaseUrl as string,
            supabaseKey: supabaseAnonKey as string,
        })
    );

    return (
        <Provider store={store}>
            <SessionContextProvider
                supabaseClient={supabaseClient}
                initialSession={pageProps.initialSession}
            >
                <Head>
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                </Head>
                <AppContent Component={Component} pageProps={pageProps} router={router} />
            </SessionContextProvider>
        </Provider>
    );
}

export default MyApp;
