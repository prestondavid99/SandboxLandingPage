// This page is the root of our app.
// Every other page we build will be a child of this page.

import type { AppProps } from 'next/app';
import Head from 'next/head';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import '../styles/style.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div>
            <Navbar />
            <main>
                <Component {...pageProps} />
            </main>
            <Footer />
        </div>
    );
}

export default MyApp;
