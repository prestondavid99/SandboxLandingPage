// pages/_app.tsx

import { useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { createPagesBrowserClient, SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import '../styles/style.css';
import { EnvProvider, useEnv } from '../context/EnvContext';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <EnvProvider>
            <AppContent Component={Component} pageProps={pageProps} />
        </EnvProvider>
    );
}

const AppContent = ({ Component, pageProps }: { Component: any; pageProps: any }) => {
    const { supabaseUrl, supabaseAnonKey } = useEnv();

    const [supabaseClient] = useState<SupabaseClient>(() =>
        createPagesBrowserClient({
            supabaseUrl: supabaseUrl as string,
            supabaseKey: supabaseAnonKey as string,
        })
    );

    return (
        <SessionContextProvider
            supabaseClient={supabaseClient}
            initialSession={pageProps.initialSession}
        >
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <Navbar />
            <main>
                <Component {...pageProps} />
            </main>
            <Footer />
        </SessionContextProvider>
    );
};

export default MyApp;
