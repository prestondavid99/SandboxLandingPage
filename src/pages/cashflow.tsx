import Head from "next/head";
import Button from "@mui/material/Button";
import {getCashFlowReport, ReportResponse} from "@/pages/api/quickbooks/reports";
import React, {useState} from "react";

const [reportData, setReportData] = useState<ReportResponse | null>(null);

// Define the click handler function
const handleClick = async () => {
    // Call the async function inside this handler
    const report = await getCashFlowReport();
    setReportData(report); // Update state or handle the response
};

export default function CashFlow() {
    return (
        <>
            <Head>
                <title>CashFlow</title>
                <meta name="description" content="This feature is coming soon" />
            </Head>
            <div>
                <Button
                    className='button button-contained'
                    variant="contained"
                    onClick={handleClick}>
                    Get CashFlow Report
                </Button>
            </div>
        </>
    );
}