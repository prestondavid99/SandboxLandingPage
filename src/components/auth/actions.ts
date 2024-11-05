'use client'

import { createClient } from '@/lib/supabase/supabaseClient'
import { Provider } from "@supabase/supabase-js";
import { getEnvVars } from '@/lib/env';

const { baseUrl } = getEnvVars();

const supabase = createClient();

export async function login(provider: Provider) {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: `${baseUrl}/profile`
            },
        });
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error logging in: ', error);
        return { success: false, error };
    }
}

export async function logout() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        // Optional: Redirect after logout
        window.location.href = `${baseUrl}/login`;
        
        return { success: true };
    } catch (error) {
        console.error('Error logging out: ', error);
        return { success: false, error };
    }
}