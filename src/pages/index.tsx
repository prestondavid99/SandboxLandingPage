import Head from 'next/head';
import Link from 'next/link';
import Button from '@mui/material/Button';

export default function Home() {
    return (
        <>
            <Head>
                <title>Caster: Create Effortless Forecasts</title>
                <meta name="description" content="Caster automates the forecasting process for ecommerce stores"/>
            </Head>
            <div className='home-container'>
                <div className="home-title-section">
                    <div className="square-container">
                        <div className="left-square"></div>
                    </div>
                    <div className='home-content-section'>

                        <div className='home-title'>
                            <h1>
                                One-click <br/>
                                <span className='text-accent'>cashflow</span> for <br/>
                                eCommerce
                            </h1>
                            <p>
                                Waste time on number crunching? <br/>
                                We fixed that.
                            </p>
                        </div>
                        <div className='home-links'>
                            <Link href="/signup">
                                <Button className='button button-contained' variant="contained">Get Started</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="square-container">
                        <div className="right-square"></div>
                    </div>
                </div>

                <div className='feature-card purple-bg'>
                    <div className='feature-content'>
                        <div className='feature-content-container'>
                            <div className='feature-visual'>
                                <img src="img/LineGraph.svg" alt="Cashflow Line Graph" width="100%"/>
                            </div>
                        </div>
                        <div className='feature-content-container'>
                            <div className='feature-text'>
                                <h2>Create <span className='text-accent'>Effortless</span> Forecasts</h2>
                                <ul>
                                    <li>Connect your QuickBooks</li>
                                    <li>Track your daily cashflow</li>
                                    <li>Automate your forecasts</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='feature-card'>
                    <div className='feature-content'>
                        {/* <div className='feature-content-container'> */}
                            <div className='feature-text'>
                                <h2>Generate <span className='text-accent'>Real-Time</span> Dashboards</h2>
                                <ul>
                                    <li>Understand trends at a glance</li>
                                    <li>Updated daily with real-time data</li>
                                    <li>Save time and money</li>
                                </ul>
                            </div>
                        {/* </div> */}
                        <div className='feature-content-container'>
                            <div className='feature-visual'>
                                <img src="img/PieChart.svg" alt="Cashflow Line Graph" width="100%"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='feature-card purple-bg'>
                    <div className='feature-content'>
                        <div className='feature-content-container'>
                            <div className='feature-visual'>
                                <img src="img/ChatbotButton.svg" alt="Cashflow Line Graph" width="100%"/>
                            </div>
                        </div>
                        <div className='feature-content-container'>
                            <div className='feature-text'>
                                <h2>Gain <span className='text-accent'>AI Assisted</span> Insights</h2>
                                <ul>
                                    <li>24/7 access to a cashflow guru</li>
                                    <li>Customized insights based on your data</li>
                                    <li>Learn best practices your competitors use</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className='free-plan-promo purple-bg'>
                <div className='free-plan-promo-text-container'>
                    <div className='feature-text'>
                        <h2>Join our <span className='text-accent'>Free</span> Plan</h2>
                        <ul>
                            <li>Automate your cashflow forecasts</li>
                            <li>Easily consume your data</li>
                            <li>Access strategic AI insights</li>
                        </ul>
                    </div>
                </div>

                <div className='free-plan-promo-signup-container'>
                    Try it out
                    <div className='free-plan-price'>$0/m</div>
                    Create and edit unlimited <br/>
                    proformas with AI
                    <Link href="/signup">
                        <Button className='button button-contained' variant="contained">Get Started</Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
