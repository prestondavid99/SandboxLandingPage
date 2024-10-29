import Head from 'next/head';
import SecondaryButton from "@/components/buttons/SecondaryButton";
import Icon from "@/components/icons/Icon";
import ToggleSwitch from "@/components/buttons/ToggleSwitch";
import ToolBar from "@/components/layout/ToolBar";
import {GraphicalSummary} from "@/components/data_analytics/GraphicalSummary";
import React from "react";
import {Line, LineChart} from "recharts";

function setTimePeriod() {}

function refreshPage() {}

// const testData = [
//     {name: 'Page A', uv: 400, pv: 2400, amt: 2400},
//     // { name: 'Group A', value: 400 },
//     // { name: 'Group B', value: 300 },
//     // { name: 'Group C', value: 300 },
//     // { name: 'Group D', value: 200 },
// ];

export default function CashPositioning() {
    return (
        <>
            <Head>
                <title>Cash Positioning</title>
                {/*<meta name="description" content="This feature is coming soon" />*/}
            </Head>
            <div className={"page-container"}>
                <h1 className={"page-title-container"}>Cash Positioning</h1>
                <ToolBar setTimePeriod={setTimePeriod} refreshPage={refreshPage} getLastRefreshTime={"00:00"}></ToolBar>
                <div className={"summary-card-container"}>
                    {/*<LineChart width={400} height={400} data={testData}>*/}
                    {/*    <Line type="monotone" dataKey="uv" stroke="#8884d8" />*/}
                    {/*</LineChart>*/}
                    <GraphicalSummary graphTitle={"Total Balance (USD)"} getNumberValue={123} ></GraphicalSummary>
                    <GraphicalSummary graphTitle={"Total Balance (USD)"} getNumberValue={123} ></GraphicalSummary>
                </div>
            </div>
        </>
    );
}