import styles from '../../../styles/components/layout/toolbar/toolbar.module.css'
import SecondaryButton from "@/components/buttons/SecondaryButton";
import ToggleSwitch from "@/components/buttons/ToggleSwitch";
import CalenderIcon from "@/components/icons/CalenderIcon";
import TimeIcon from "@/components/icons/TimeIcon";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import RefreshIcon from "@/components/icons/RefreshIcon";
import DownloadIcon from "@/components/icons/DownloadIcon";
import SecondaryButtonDropDown from "@/components/buttons/SecondaryButtonDropDown";
import React from "react";
import ExpandArrowIcon from "@/components/icons/ExpandArrowIcon";
import {TimePeriod} from "@/model/navigation/TimePeriod";

interface ToolBarProps {
    setTimePeriod: (period: TimePeriod) => void
    refreshPage: () => void
    getLastRefreshTime: string
}

const ToolBar: React.FC<ToolBarProps> = ({ setTimePeriod, getLastRefreshTime = "00:00", refreshPage }) => {
    const [isDropDownOpen, setIsDropDownOpen] = React.useState(false);
    const [selectedTimePeriod, setSelectedTimePeriod] = React.useState<TimePeriod>(TimePeriod.WEEK_TO_DATE);

    const handleDropDownToggle = () => {
        setIsDropDownOpen(!isDropDownOpen);
    }

    const handlePeriodSelect = (period: TimePeriod) => {
        setSelectedTimePeriod(period);
        setIsDropDownOpen(false);
    }

    return (
        <>
            <div className={styles.toolBarContainer}>
                <div className={styles.leftToolBarContainer}>
                    <SecondaryButtonDropDown
                        isOpen={isDropDownOpen}
                        onToggle={handleDropDownToggle}
                        title={selectedTimePeriod}
                        leftIcon={<CalenderIcon/>}
                        rightIcon={<ExpandArrowIcon/>}
                        selectedTimePeriod={selectedTimePeriod}
                        onPeriodSelect={handlePeriodSelect}
                    />
                    <ToggleSwitch label={"Include Credit"}></ToggleSwitch>
                </div>
                <div className={styles.rightToolBarContainer}>
                    <div className={styles.refreshInfoContainer}>
                        <TimeIcon></TimeIcon>
                        <span className={styles.lastRefreshText}>Last Refreshed</span>
                        <span>Yesterday at {getLastRefreshTime}</span>
                    </div>
                    <SecondaryButton handleClick={refreshPage} title={"Refresh"}
                                     leftIcon={<RefreshIcon></RefreshIcon>}></SecondaryButton>
                    <PrimaryButton handleClick={refreshPage} title={"Export"}
                                   leftIcon={<DownloadIcon></DownloadIcon>}></PrimaryButton>
                </div>
            </div>
        </>
    );
};

export default ToolBar;
