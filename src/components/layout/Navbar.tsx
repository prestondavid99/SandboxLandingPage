import Link from 'next/link';
import Button from '@mui/material/Button';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <Link id="logo" href="/">caster</Link>
            <ul>
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
            </ul>
        </nav>
    );
};

export default Navbar;
