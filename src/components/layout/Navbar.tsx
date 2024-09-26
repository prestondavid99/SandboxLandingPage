import Link from 'next/link';
import Button from '@mui/material/Button';
import { useSession } from '@supabase/auth-helpers-react';
import SignOutButton from '../auth/SignOutButton';

const Navbar: React.FC = () => {
    const session = useSession();

    return (
        <nav className="navbar">
            <Link className="logo-text" href="/">caster</Link>
            <ul>
                {session ? (
                    <>
                        <li>
                            <SignOutButton/>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="/comingsoon">
                                Log In
                            </Link>
                        </li>
                        <li>
                            <Link href="/signup">
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
