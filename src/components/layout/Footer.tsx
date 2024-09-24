import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/*Left Section: Logo and Copyright*/}
                <div className="footer-left">
                    <Link className="logo-text" href="/">caster</Link>
                    <p>&copy; 2024 Caster. All rights reserved.</p>
                </div>

                {/*Right Section: Navigation Links*/}
                <div className="footer-right">
                    <div className="footer-column">
                        <p>Product</p>
                        <Link href={"/comingsoon"}>Pricing</Link>
                        <Link href={"/comingsoon"}>Demo</Link>
                        <Link href={"/comingsoon"}>Log In</Link>
                    </div>

                    <div className="footer-column">
                        <p>Company</p>
                        <Link href={"/comingsoon"}>About</Link>
                        <Link href={"/comingsoon"}>Contact</Link>
                    </div>

                    <div className="footer-column">
                        <p>Legal</p>
                        <Link href={"/comingsoon"}>Privacy Policy</Link>
                        <Link href={"/comingsoon"}>Terms and Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>

    );
};

export default Footer;