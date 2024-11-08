import styles from "../../styles/components/icons/icons.module.css"
import { SVGProps } from 'react';

const RefreshIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            width="28"
            height="24"
            viewBox="0 0 28 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                className={styles.iconPath}
                d="M16 15L12 19L16 23"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                className={styles.iconPath}
                d="M20.0622 8.5C20.6766 9.56413 21 10.7712 21 12C21 13.2288 20.6766 14.4359 20.0622 15.5C19.4478 16.5641 18.5641 17.4478 17.5 18.0622C16.4359 18.6766 15.2288 19 14 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                className={styles.iconPath}
                d="M12 9L16 5L12 1"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                className={styles.iconPath}
                d="M7.93782 15.5C7.32344 14.4359 7 13.2288 7 12C7 10.7712 7.32344 9.56413 7.93782 8.5C8.5522 7.43587 9.43587 6.5522 10.5 5.93782C11.5641 5.32344 12.7712 5 14 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default RefreshIcon;