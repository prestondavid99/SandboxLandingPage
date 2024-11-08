import styles from "../../styles/components/layout/account-drop-down.module.css"
import {CashPositionAccount} from "@/model/CashPositionAccount";
// @ts-ignore
import { UisTriangle } from "@iconscout/react-unicons-solid"
import {useState} from "react";
import {CashPositionCard} from "@/components/layout/CashPositionCard";
import {CashPositionCardData} from "@/model/CashPositionCardData";
import {ColumnTitles} from "@/components/layout/ColumnTitles";



interface AccountDropDownProps {
    account: CashPositionAccount
}


export const AccountDropDown = (props: AccountDropDownProps) => {
    const [isSelected, setIsSelected] = useState<boolean>(false)

    const handleClick = () => {
        setIsSelected(!isSelected)
    }

    return (
        <div className={styles.container} onClick={ handleClick }>
            <div className={styles.dropDownContainer}>
                <div className={`${styles.triangle} ${isSelected ? styles.closeRotation : styles.openRotation}`}>
                    <UisTriangle size={"1.2rem"}></UisTriangle>
                </div>
                <h3>{props.account.accountName}</h3>
            </div>
            {isSelected && (props.account.accounts.length > 0) && (
                <ColumnTitles leftTitles={["Account"]} rightTitles={["Opening Balance", "Trend", "Closing Balance"]}/>
            )
            }
            {isSelected && (
                props.account.accounts?.map((account) => (
                        <CashPositionCard
                            accountName={account.accountName}
                            accountId={account.accountId}
                            openingBalance={account.openingBalance}
                            trend={account.trend}
                            closingBalance={account.closingBalance}
                        />
                    ))
            )}

        </div>
    )
}