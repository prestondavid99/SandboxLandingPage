import styles from "../../styles/components/icons/icons.module.css"
import { SVGProps } from 'react';

const CalenderIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            width="28"
            height="24"
            viewBox="0 0 28 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect
                className={styles.iconPath}
                x="5"
                y="6"
                width="18"
                height="15"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                className={styles.iconPath}
                d="M5 10C5 8.11438 5 7.17157 5.58579 6.58579C6.17157 6 7.11438 6 9 6H19C20.8856 6 21.8284 6 22.4142 6.58579C23 7.17157 23 8.11438 23 10H5Z"
                fill="currentColor"
            />
            <path
                className={styles.iconPath}
                d="M9 3L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                className={styles.iconPath}
                d="M19 3L19 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default CalenderIcon;