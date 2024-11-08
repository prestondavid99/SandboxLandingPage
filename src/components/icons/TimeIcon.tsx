import styles from "../../styles/components/icons/icons.module.css"
import { SVGProps } from 'react';

const TimeIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle
                className={styles.iconPath}
                cx="12"
                cy="12.0001"
                r="9"
                stroke="currentColor"
                strokeOpacity="0.5"
                strokeWidth="2"
            />
            <path
                className={styles.iconPath}
                d="M16.5 12.0001H12.25C12.1119 12.0001 12 11.8882 12 11.7501V8.50009"
                stroke="currentColor"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default TimeIcon;