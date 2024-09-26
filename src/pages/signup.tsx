import Head from 'next/head';
import OAuthLoginButton from '@/components/auth/OAuthLoginButton';

export default function SignUp() {
    return (
        <>
            <Head>
                <title>Sign up for Caster!</title>
                <meta name="description" content="Create a free account on Caster to get started with forecasting" />
            </Head>
            <div>
                <h1>Sign Up</h1>
                <OAuthLoginButton provider="google" buttonText="Sign up with Google" />
            </div>
        </>
    );
}