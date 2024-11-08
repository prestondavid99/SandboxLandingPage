import Head from 'next/head';
import { CashPositionAccount } from '@/model/CashPositionAccount'
import styles from "../styles/pages/cash-positioning.module.css"
import SecondaryButton from "@/components/buttons/SecondaryButton";
import Icon from "@/components/icons/Icon";
import ToggleSwitch from "@/components/buttons/ToggleSwitch";
import ToolBar from "@/components/layout/toolbar/ToolBar";
import {GraphicalSummaryCard} from "@/components/data_analytics/GraphicalSummaryCard";
import React from "react";
import {Line, LineChart} from "recharts";
import {PieChartSummary} from "@/components/data_analytics/PieChartSummary";
import {BalanceSummary} from "@/components/data_analytics/BalanceSummary";
import {ColumnTitles} from "@/components/layout/ColumnTitles";
import {AccountDropDown} from "@/components/layout/AccountDropDown";
import {LineGraphCard} from "@/components/data_analytics/LineGraphCard";
import {CashPositionCardData} from "@/model/CashPositionCardData";

function setTimePeriod() {}

function refreshPage() {}

// const testData = [
//     {name: 'Page A', uv: 400, pv: 2400, amt: 2400},
//     // { name: 'Group A', value: 400 },
//     // { name: 'Group B', value: 300 },
//     // { name: 'Group C', value: 300 },
//     // { name: 'Group D', value: 200 },
// ];

const mercuryAccount = new CashPositionAccount("Mercury", [new CashPositionCardData("Mercury", 3821, 1239, 13, 1235)])
const amExAccount = new CashPositionAccount("AmericanExpress", [new CashPositionCardData("AmEx", 3821, 1239, 13, 1235)])

export default function CashPositioning() {
    return (
        <>
            <Head>
                <title>Cash Positioning</title>
                {/*<meta name="description" content="This feature is coming soon" />*/}
            </Head>
            <div className={"page-container"}>
                <h1 className={"page-title-container"}>Cash Positioning</h1>
                <ToolBar setTimePeriod={setTimePeriod} refreshPage={refreshPage} getLastRefreshTime={"00:00"}/>
                <div className={"summary-card-container"}>
                    {/*<LineChart width={400} height={400} data={testData}>*/}
                    {/*    <Line type="monotone" dataKey="uv" stroke="#8884d8" />*/}
                    {/*</LineChart>*/}
                    <GraphicalSummaryCard
                        graphicSummary={<PieChartSummary></PieChartSummary>}
                        graphTitle={"Total Balance (USD)"}>
                    </GraphicalSummaryCard>
                    <GraphicalSummaryCard
                        graphicSummary={<BalanceSummary></BalanceSummary>}
                        graphTitle={"Cash Movement (USD)"}>
                    </GraphicalSummaryCard>
                </div>
                <div className={styles.accountsContainer}>
                    <AccountDropDown account={mercuryAccount}></AccountDropDown>
                    <AccountDropDown account={amExAccount}></AccountDropDown>
                    <LineGraphCard></LineGraphCard>
                </div>
            </div>
        </>
    );
}