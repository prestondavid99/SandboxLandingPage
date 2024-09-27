"use client";

import { Provider } from "@supabase/supabase-js";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface OAuthLoginButtonProps {
    provider: Provider;
    buttonText: string;
}

function OAuthLoginButton({ provider, buttonText }: OAuthLoginButtonProps) {
    const supabase = useSupabaseClient();

    async function handleClickLoginButton() {
        await supabase.auth.signInWithOAuth({ provider });
    }

    return (
        <button 
            onClick={handleClickLoginButton}
        >
            {buttonText}
        </button>
    );
}

export default OAuthLoginButton;
