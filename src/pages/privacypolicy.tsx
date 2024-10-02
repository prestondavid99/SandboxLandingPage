// pages/privacy.tsx

import Head from 'next/head';

const PrivacyPolicy = () => {
    return (
        <>
            <Head>
                <title>Privacy Policy - Caster</title>
                <meta name="description" content="Privacy Policy for Caster, your go-to solution for cashflow and financial forecasting for eCommerce stores." />
            </Head>
            <div>
                <h1>Privacy Policy</h1>
                <p><strong>Effective Date:</strong> 10/2/2024</p>
                <p><strong>Caster</strong> ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our website and services, including our cashflow and financial forecasting tools for eCommerce stores (the "Service"). By using our Service, you agree to the collection and use of information in accordance with this Privacy Policy.</p>

                <h2>1. Information We Collect</h2>
                <p>We collect various types of information in order to provide and improve our Service to you.</p>

                <h3>1.1. Personal Information</h3>
                <p>When you create an account or use our Service, we may collect the following personal information:</p>
                <ul>
                    <li>Full Name</li>
                    <li>Email Address</li>
                    <li>Business Name</li>
                    <li>Financial Information related to your eCommerce store, including, but not limited to, revenue, expenses, cashflow data, and other relevant financial metrics.</li>
                </ul>

                <h3>1.2. Financial Data</h3>
                <p>To provide accurate cashflow and financial forecasts, we may collect the following data:</p>
                <ul>
                    <li>eCommerce store financial data through integration with third-party accounting platforms like <strong>QuickBooks</strong> or other financial services.</li>
                    <li>Transaction history, expenses, and income details related to your eCommerce store.</li>
                </ul>

                <h3>1.3. Usage Data</h3>
                <p>We automatically collect information on how the Service is accessed and used. This may include information such as your device's <strong>IP address</strong>, <strong>browser type</strong>, <strong>browser version</strong>, the pages of our Service that you visit, and other diagnostic data.</p>

                <h2>2. How We Use Your Information</h2>
                <p>We use the information we collect for various purposes:</p>
                <ul>
                    <li>To provide, operate, and maintain our Service.</li>
                    <li>To monitor and analyze your financial data to generate cashflow forecasts and insights for your eCommerce store.</li>
                    <li>To communicate with you, including sending you updates and responding to inquiries.</li>
                    <li>To detect, prevent, and address technical issues and security concerns.</li>
                    <li>To comply with applicable laws, legal requests, and regulatory requirements.</li>
                </ul>

                <h2>3. Sharing Your Information</h2>
                <p>We may share your information in the following ways:</p>

                <h3>3.1. Third-Party Services</h3>
                <p>We use third-party financial services such as <strong>QuickBooks</strong> for financial data integration. When you connect your eCommerce store to these services, your data will be shared in accordance with their privacy policies.</p>

                <h3>3.2. Legal Requirements</h3>
                <p>We may disclose your personal information if required by law or in response to valid legal requests by public authorities (e.g., a court or government agency).</p>

                <h3>3.3. Business Transfers</h3>
                <p>In the event that Caster undergoes a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</p>

                <h2>4. Data Security</h2>
                <p>We take data security seriously and use industry-standard methods to protect your personal information. However, no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>

                <h2>5. Your Data Protection Rights</h2>
                <p>You have the following rights regarding the information we hold about you:</p>
                <ul>
                    <li><strong>Right to Access</strong>: You can request copies of your personal data.</li>
                    <li><strong>Right to Correction</strong>: You can request correction of any inaccurate or incomplete information.</li>
                    <li><strong>Right to Deletion</strong>: You can request that we erase your personal data, subject to legal obligations.</li>
                    <li><strong>Right to Object</strong>: You can object to certain uses of your data, such as direct marketing.</li>
                </ul>

                <h2>6. Third-Party Links</h2>
                <p>Our Service may contain links to third-party websites or services that are not operated by us. We are not responsible for the privacy practices of those third-party websites.</p>

                <h2>7. Children's Privacy</h2>
                <p>Our Service is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have inadvertently collected such information, we will take steps to delete it.</p>

                <h2>8. Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this Privacy Policy periodically.</p>

            </div>
        </>
    );
};

export default PrivacyPolicy;
