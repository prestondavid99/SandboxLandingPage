import Button from "@mui/material/Button";
import React, {useEffect, useRef} from "react";
import styles from "../../styles/components/buttons/secondary-button-drop-down.module.css"
import SecondaryButton from "@/components/buttons/SecondaryButton";
import {MenuItem} from "@/components/layout/toolbar/MenuItem";
import {TimePeriod} from "@/model/navigation/TimePeriod";

interface SecondaryButtonDropDownProps {
    isOpen: boolean;
    onToggle: () => void;
    title: string;
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
    selectedTimePeriod: TimePeriod;
    onPeriodSelect: (period: TimePeriod) => void;
}

const SecondaryButtonDropDown: React.FC<SecondaryButtonDropDownProps> = ({isOpen, onToggle, title, leftIcon, rightIcon, onPeriodSelect, selectedTimePeriod }) => {

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && isOpen) {
                onToggle();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onToggle]);

    return (
        <div className={styles.buttonContainer} ref={dropdownRef}>
            <SecondaryButton handleClick={onToggle} title={title} leftIcon={leftIcon} rightIcon={rightIcon}></SecondaryButton>
            {isOpen && (
                <ul className={styles.menuContainer}>
                    {Object.values(TimePeriod).map((period: TimePeriod) => (
                        <li key={period} className={styles.menuItemContainer}>
                            <MenuItem
                                object={period}
                                isActive={period === selectedTimePeriod}
                                onSelect={() => onPeriodSelect(period)}>
                            </MenuItem>
                        </li>
                    ))}

                </ul>
            )}
        </div>
    );
}

export default SecondaryButtonDropDown;