'use client'

import { createClient } from '@/lib/supabase/supabaseClient'
import { Provider } from "@supabase/supabase-js";
import { getEnvVars } from '@/lib/env';

const { baseUrl } = getEnvVars();

export async function login(provider: Provider) {
    try {
        const supabase = await createClient();

        const { error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: `${baseUrl}/profile`
            },
        });
        if (error) throw error;
    } catch (error) {
        console.error('error loggin in: ', error);
    }
}

export async function logout() {
    try {
        const supabase = await createClient();
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    } catch (error) {
        console.error('error loggin out: ', error);
    }
}