import styles from "../../styles/components/layout/account-drop-down.module.css"

interface ColumnTitlesProps {
    leftTitles: string[];
    rightTitles: string[];
}

export const ColumnTitles = (props: ColumnTitlesProps) => {
    return (
        <div className={`${styles.columnTitleContainer}`}>
            {/*<div className={styles.groupContainer}>*/}
                {props.leftTitles.map((title, index) => (
                    <h4 key={index}>{title}</h4>
                ))}
            {/*</div>*/}
            {/*<div className={styles.groupContainer}>*/}
                {props.rightTitles.map((title, index) => (
                    <h4 className={styles.titleTextStyle} key={index}>{title}</h4>
                ))}
            {/*</div>*/}
        </div>
    )
}