"use client";

import Button from '@mui/material/Button';
import { logout } from "./actions";

function SignOutButton() {
    async function handleLogout() {
        logout();
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
