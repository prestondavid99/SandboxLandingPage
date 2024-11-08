import styles from "../../styles/components/icons/icons.module.css"
import {SVGProps} from "react";

const ExpandArrowIcon: React.FC<SVGProps<SVGSVGElement>> = () => {
    return (
        <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={styles.iconPath} d="M13 1.00009L7 9.00009L1 1.00009" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
        </svg>
    )
}

export default ExpandArrowIcon;