import styles from '../../styles/components/data_analytics/formatted-balance-text.module.css';

interface FormattedBalanceTextProps {
    label: string;
    amount: number;
    currency: string;
}

export const FormattedBalanceText = ({ label, amount, currency }: FormattedBalanceTextProps) => {
    const [wholePart, decimalPart] = amount.toFixed(2).split('.');
    return (
        <div className={styles.balanceTextContainer}>
            <span className={styles.grayText}>{label}</span>
            <div className={styles.amountContainer}>
                <span className={styles.dollarsText}>{amount}</span>
                <span className={styles.grayText}>{currency}</span>
            </div>
        </div>
    );
}