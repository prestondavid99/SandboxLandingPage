// pages/_app.tsx

import { useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { createPagesBrowserClient, SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { wrapper } from '../store';
import { getEnvVars } from '@/lib/env';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

import '../styles/style.css';
import '../styles/pages/signup.css';
import '../styles/components/auth/oauth-login-button.css'

function MyApp({ Component, pageProps }: AppProps) {
    const { supabaseUrl, supabaseAnonKey } = getEnvVars();

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
}

export default wrapper.withRedux(MyApp);