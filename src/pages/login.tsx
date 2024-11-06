import Head from 'next/head';
import OAuthLoginButton from '@/components/auth/OAuthLoginButton';
import useUserSession from '@/lib/hooks/useUserSession';

export default function LogIn() {
    const { user, session } = useUserSession();

    // if user is logged in, redirect to profile
    if (user) {
        window.location.href = '/profile';
    }

    return (
        <>
            <Head>
                <title>Log in to Caster!</title>
                <meta name="description" content="Create a free account on Caster to get started with forecasting" />
            </Head>
            <div className="container">
                <div className="elevated-container">
                    <h2>Log in</h2>
                    <OAuthLoginButton 
                        provider="google" 
                        logo="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                        buttonText="Continue with Google" 
                    />
                </div>
            </div>
        </>
    );
}