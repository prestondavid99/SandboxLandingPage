import Head from 'next/head';
import OAuthLoginButton from '@/components/auth/OAuthLoginButton';

export default function SignUp() {
    return (
        <>
            <Head>
                <title>Sign up for Caster!</title>
                <meta name="description" content="Create a free account on Caster to get started with forecasting" />
            </Head>
            <div className="container">
                <div className="elevated-container">
                    <h2>Sign Up</h2>
                    <OAuthLoginButton provider="google" buttonText="Sign up with Google" />
                    <div className="buttons button-oauth">
                    <div className="oauth-container">
                        <img
                            src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                            alt="Google Logo" className="oauth-logo"/>
                        <p>Continue with Google</p>
                    </div>
                    </div>

                </div>
            </div>
        </>
    );
}