import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/*Left Section: Logo and Copyright*/}
                <div className="footer-left">
                    <div className="logo">
                        <p>caster</p>
                    </div>
                    <p>&copy; 2024 Caster. All rights reserved.</p>
                </div>

                {/*Right Section: Navigation Links*/}
                <div className="footer-right">
                    <div className="footer-column">
                        <h4>Product</h4>
                        <Link href={""}>Pricing</Link>
                        <Link href={""}>Demo</Link>
                        <Link href={""}>Log In</Link>
                    </div>

                    <div className="footer-column">
                        <h4>Company</h4>
                        <Link href={""}>About</Link>
                        <Link href={""}>Contact</Link>

                    </div>

                    <div className="footer-column">
                        <h4>Legal</h4>
                        <Link href={"TODO"}>Privacy Policy</Link>
                        <Link href={""}>Terms and Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>

    );
};

export default Footer;