// This page is the root of our app.
// Every other page we build will be a child of this page.

import { useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import '../styles/style.css';

function MyApp({ Component, pageProps }: AppProps) {
    const [supabaseClient] = useState(() => createPagesBrowserClient());
    
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

export default MyApp;
