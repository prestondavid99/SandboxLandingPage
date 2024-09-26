"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Button from '@mui/material/Button';


function SignOutButton() {
    const supabase = useSupabaseClient();

    async function handleLogout() {
        await supabase.auth.signOut();
    }

    return (
        <Button 
            onClick={handleLogout} 
            className='button button-contained' 
            variant="contained"
        >
            Sign out
        </Button>
    );
}

export default SignOutButton;
