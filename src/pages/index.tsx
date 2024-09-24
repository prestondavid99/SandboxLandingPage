import Head from 'next/head';
import Link from 'next/link';
import Button from '@mui/material/Button';

export default function Home() {
    return (
        <>
            <Head>
                <title>Caster: Create Effortless Forecasts</title>
                <meta name="description" content="Caster automates the forecasting process for ecommerce stores" />
            </Head>
            <div className='home-title-section'>
                <div className='home-title'>
                    <h1>
                        AI-Powered <br></br>
                        <span className='text-accent'>Proforma</span> for <br></br>
                        eCommerce
                    </h1>
                    <p>
                        Spend less time in Excel and more time <br></br>
                        growing your business
                    </p>
                </div>
                <div className='home-links'>
                    <form className="submit-email" action="/submit-email" method="POST">
                        <input type="email" id="email" name="email" required placeholder="Enter your email"/>
                    </form>
                    <Link href="/signup">
                        <Button className='button button-contained' variant="contained">Join Waitlist</Button>
                    </Link>
                    {/*<Link href="/comingsoon">Watch Demo</Link>*/}
                </div>

            </div>
        </>
    );
}
