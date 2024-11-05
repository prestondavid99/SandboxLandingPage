import Link from 'next/link';
import Button from '@mui/material/Button';
import { Session, User, useSession, useSessionContext } from '@supabase/auth-helpers-react';
import SignOutButton from '../auth/SignOutButton';
import { supabase } from '@/lib/supabase/supabaseClient';
import { useEffect, useState } from 'react';

const Navbar: React.FC = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    
    useEffect(() => {
        const fetchSessionAndUser = async () => {
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (sessionError) {
                console.error('Error fetching session:', sessionError.message);
            } else {
                setSession(session);
            }

            if (userError) {
                console.error('Error fetching user:', userError.message);
            } else {
                setUser(user);
            }
        };

        fetchSessionAndUser();
    }, []);

    return (
        <nav className="navbar">
            <Link className="logo-text" href="/">caster</Link>
            <ul>
                {user ? (
                    <>
                        <li>
                            <Link href="/cashflow">
                                Cashflow
                            </Link>
                        </li>
                        <li>
                            <Link href="/profile">
                                Profile
                            </Link>
                        </li>
                        <li>
                            <SignOutButton/>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="/login">
                                Log In
                            </Link>
                        </li>
                        <li>
                            <Link href="/login">
                                <Button className='button button-contained' variant="contained">Sign up</Button>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
