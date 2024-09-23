import Head from 'next/head';
import Link from 'next/link';
import Button from '@mui/material/Button';
import '../styles/style.css';

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
                        AI-Powered 
                        <div className='text-accent'>Proforma</div> 
                        for eCommerce
                    </h1>
                    <p>Spend less time in Excel and more time growing your business</p>
                </div>
                <div className='home-links'>
                    <Link href="/signup">
                        <Button className='button button-contained' variant="contained">Join Waitlist</Button>
                    </Link>
                    <Link href="/comingsoon">Watch Demo</Link>
                </div>
                
            </div>
        </>
    );
}
