import styles from "../../../styles/components/layout/toolbar/menu-item.module.css"
import {TimePeriod} from "@/model/navigation/TimePeriod";
import React from "react";

interface MenuItemProps<T> {
    object: T;
    onSelect: (value: T) => void;
    isActive: boolean;
}

export const MenuItem = <T extends { toString(): string }>({
                                                               object,
                                                               onSelect,
                                                               isActive
                                                           }: MenuItemProps<T>) => {
    const handleClick = () => {
        onSelect(object)
    }

    return (
        <div className={styles.menuItemContainer} onClick={handleClick}>
            {isActive ? (
                <>
                    <div className={styles.menuItemTextActive}>{object.toString()}</div>
                    <div className={styles.underline} />
                </>
            ) : (
                <>
                    <div className={styles.menuItemText}>{object.toString()}</div>
                    <div className={styles.underlineInvisible} />
                </>
            )}
        </div>
    );
}