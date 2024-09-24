import { useState, useEffect } from "react";
import Link from "next/link";

const Footer: React.FC = () => {
    // State to track the current theme
    const [darkMode, setDarkMode] = useState(false);

    // On mount, check the saved theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setDarkMode(true);
            document.body.classList.add("dark-mode");
        }
    }, []);

    // Function to toggle theme
    const toggleTheme = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
    };

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
                        <span 
                            className="theme-toggle" 
                            onClick={toggleTheme} 
                            aria-label="Toggle Dark/Light Mode"
                        >
                            {darkMode ? "Light Mode" : "Dark Mode"}
                        </span>
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