"use client";

import { Provider } from "@supabase/supabase-js";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React from "react";
import { getEnvVars } from "@/lib/env";

interface OAuthLoginButtonProps {
    provider: Provider;
    logo: string;
    buttonText: string;
}

const { baseUrl } = getEnvVars();

function OAuthLoginButton({ provider, logo, buttonText }: OAuthLoginButtonProps) {
    const supabase = useSupabaseClient();

    async function handleClickLoginButton() {
        await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: `${baseUrl}/profile` // redirect to profile page after login
            },
        });
    }

    return (
        <button className="button-oauth" onClick={handleClickLoginButton}>
            <div className="oauth-padding">
                <img
                    src={logo}
                    alt="oAuthLogo" className="oauth-logo"/>
                {buttonText}
            </div>
        </button>
    );
}

export default OAuthLoginButton;
