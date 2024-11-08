import {CashPositionCardData} from "@/model/CashPositionCardData";
import styles from "../../styles/components/layout/account-drop-down.module.css"

interface CashPositionCardProps {
    accountName: string
    accountId: number;
    openingBalance: number;
    trend: number;
    closingBalance: number;
}

export const CashPositionCard = (props: CashPositionCardProps) => {
    return (
        <div className={styles.columnCardTitleContainer}>
            <div className={styles.leftContainer}>
                <span className={styles.primaryTextStyleNoFlex}>{props.accountName}</span>
                <span className={styles.lightTextStyle}>*{props.accountId}</span>
            </div>
            {/*<div className={styles.rightContainer}>*/}
                <div className={styles.primaryTextStyle}>${props.openingBalance}</div>
                <div className={styles.trendContainer}>{(props.trend > 0) ? '+' : ''}{props.trend}%</div>
                <div className={styles.primaryTextStyle}>${props.closingBalance}</div>
            {/*</div>*/}
        </div>
    )
}