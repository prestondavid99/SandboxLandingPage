import styles from "../../styles/components/data_analytics/line-graph.module.css"
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React from "react";


const data: CartesianDataItem[] = [
    {
        xDataTitle: 'Monday',
        yAmt: 4000,
    },
    {
        xDataTitle: 'Tuesday',
        yAmt: 3000,
    },
    {
        xDataTitle: 'Wednesday',
        yAmt: 2000,
    },
    {
        xDataTitle: 'Thursday',
        yAmt: 2780,
    },
    {
        xDataTitle: 'Friday',
        yAmt: 1890,
    },
    {
        xDataTitle: 'Saturday',
        yAmt: 2390,
    },
    {
        xDataTitle: 'Sunday',
        yAmt: 3490,
    },
];
interface LineGraphCardProps {

}

export const LineGraphCard = (props: LineGraphCardProps) => {
    return (
        <div className={styles.container}>
            <h2>Cash Balance Over Time</h2>
            <ResponsiveContainer width="100%" height="80%">
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    {/*<defs>*/}
                    {/*    <linearGradient id="colorGradient" x1="0" y1="0.1" x2="0" y2="1">*/}
                    {/*        <stop offset="1%" stopColor="#8884d8" stopOpacity={0.8}/>*/}
                    {/*        <stop offset="99%" stopColor="#FFFFFF" stopOpacity={0.1}/>*/}
                    {/*    </linearGradient>*/}
                    {/*</defs>*/}
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="xDataTitle"/>
                    <YAxis/>
                    <Tooltip/>
                    <Area type="monotone" dataKey="yAmt" stroke="#8884d8" fill="#8884d8"
                          fillOpacity={1}/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}