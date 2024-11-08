import styles from "@/styles/components/data_analytics/graphical-summary.module.css";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer} from "recharts";

const testData: PieDataItem[] = [
    {name: 'Mercury', amt: 2289.05, color: 'var(--primary-color)'},
    {name: 'Chase', amt: 2930.38, color: 'var(--secondary-color)'},
    {name: 'Shopify', amt: 1008.89, color: 'var(--accent-color-1)'},
];

interface PieChartSummaryProps {
    getDataFields?: PieDataItem[];
}

export const PieChartSummary = ({ getDataFields = testData }: PieChartSummaryProps) => {
    return (
        <ResponsiveContainer className={styles.chartContainer} width={"50%"} height={"100%"}>
            <PieChart>
                <Pie
                    data={getDataFields}
                    dataKey={"amt"}
                    nameKey="name"
                    paddingAngle={2}
                    outerRadius={"100%"}
                    innerRadius={"65%"}
                >
                    {testData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color}/>
                    ))}
                </Pie>
                <Legend iconSize={17} layout="vertical" verticalAlign="middle" align={"right"}
                        iconType={"circle"}/>
            </PieChart>
        </ResponsiveContainer>
    )
}