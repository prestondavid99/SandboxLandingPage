import Link from 'next/link';
import Button from '@mui/material/Button';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <Link href="/">LOGO</Link>
            <ul>
                <li>
                    <Link href="/about">
                        <Button className='button-text' variant="text">Log in</Button>
                    </Link>
                </li>
                <li>
                    <Link href="/contact">
                        <Button className='button-contained' variant="contained">Sign up</Button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
