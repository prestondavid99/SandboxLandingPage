import styles from "../../styles/components/data_analytics/graphical-summary.module.css"
import {Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Sector} from "recharts";
import {func} from "prop-types";

const testData: DataItem[] = [
    {name: 'Mercury', amt: 2289.05, color: 'var(--primary-color)'},
    {name: 'Chase', amt: 2930.38, color: 'var(--secondary-color)'},
    {name: 'Shopify', amt: 1008.89, color: 'var(--accent-color-1)'},
];

function getTotalAmt() {
    let totalAmt = 0;
    testData.map((entry, index) =>
        totalAmt += entry.amt
    )
    return totalAmt.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
}


interface GraphicalSummaryProps {
    graphTitle: string;
    getNumberValue: number;
    getDataFields?: DataItem[];
}

const legendStyle = {
    top: '50%',
    right: '0.5rem',
    transform: 'translate(0, -50%)',
    lineHeight: '1.5rem',
};


export const GraphicalSummary = ({ graphTitle, getNumberValue, getDataFields = testData }: GraphicalSummaryProps) => {
    return (
        <div className={styles.graphicalSummaryContainer}>
            <div className={styles.titleContainer}>
                <h4>{graphTitle}</h4>
                <h2>{getTotalAmt()}</h2>
            </div>
            <ResponsiveContainer className={styles.chartContainer} width={"50%"} height={"100%"}>
                    <PieChart>
                        <Pie
                            data={testData}
                            dataKey={"amt"}
                            nameKey="name"
                            paddingAngle={2}
                            outerRadius={"100%"}
                            innerRadius={"65%"}
                            >
                            {testData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Legend iconSize={17} layout="vertical" verticalAlign="middle" wrapperStyle={legendStyle} iconType={"circle"}/>
                    </PieChart>
                </ResponsiveContainer>
        </div>
    )
}