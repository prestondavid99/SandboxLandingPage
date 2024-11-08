import styles from "../../styles/components/data_analytics/graphical-summary.module.css"
import {Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Sector} from "recharts";
import {func} from "prop-types";

const testData: PieDataItem[] = [
    {name: 'Mercury', amt: 2289.05, color: 'var(--primary-color)'},
    {name: 'Chase', amt: 2930.38, color: 'var(--secondary-color)'},
    {name: 'Shopify', amt: 1008.89, color: 'var(--accent-color-1)'},
];

function getTotalAmt(data: PieDataItem[]) {
    let totalAmt = 0;
    data.map((entry, index) =>
        totalAmt += entry.amt
    )
    return totalAmt.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
}

interface GraphicalSummaryProps {
    graphicSummary: JSX.Element;
    graphTitle: string;
    getDataFields?: PieDataItem[];
    isTrendGood?: boolean;
    trendAmount?: number;
}

export const GraphicalSummaryCard = (
    {
        graphicSummary,
        graphTitle,
        getDataFields = testData,
        isTrendGood = true,
        trendAmount = 4000.81,

    }: GraphicalSummaryProps) => {
    return (
        <div className={styles.graphicalSummaryContainer}>
            <div className={styles.titleContainer}>
                <h4>{graphTitle}</h4>
                <h2>{getTotalAmt(getDataFields)}</h2>
                <div>
                    <span className={isTrendGood ? styles.goodText : styles.badText}>
                was {trendAmount}
                    </span>
                    <span> - 1 week ago</span>
                </div>
            </div>
            {graphicSummary}
        </div>
    )
}