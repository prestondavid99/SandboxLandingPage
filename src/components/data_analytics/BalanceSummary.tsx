import styles from "../../styles/components/data_analytics/balance-summary.module.css"
import {FormattedBalanceText} from "@/components/data_analytics/FormattedBalanceText";

interface BalanceSummaryProps {
    openingBalance?: number
    closingBalance?: number
}

export const BalanceSummary = ({ openingBalance = 1000, closingBalance = 1200 }: BalanceSummaryProps) => {
    return (
        <div className={styles.summaryContainer}>
            <FormattedBalanceText label={"Opening Balance"} amount={openingBalance} currency={"USD"}></FormattedBalanceText>
            <FormattedBalanceText label={"Closing Balance"} amount={closingBalance} currency={"USD"}></FormattedBalanceText>
        </div>
    )
}