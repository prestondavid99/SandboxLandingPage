import styles from "../../styles/components/icons/icons.module.css"
import { SVGProps } from 'react';

const DownloadIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                className={styles.lightIconPath}
                d="M12 14.0001L11.2929 14.7072L12 15.4143L12.7071 14.7072L12 14.0001ZM13 5.00009C13 4.44781 12.5523 4.00009 12 4.00009C11.4477 4.00009 11 4.44781 11 5.00009L13 5.00009ZM6.29289 9.7072L11.2929 14.7072L12.7071 13.293L7.70711 8.29298L6.29289 9.7072ZM12.7071 14.7072L17.7071 9.7072L16.2929 8.29299L11.2929 13.293L12.7071 14.7072ZM13 14.0001L13 5.00009L11 5.00009L11 14.0001L13 14.0001Z"
                fill="currentColor"
            />
            <path
                className={styles.lightIconPath}
                d="M5 16.0001L5 17.0001C5 18.1047 5.89543 19.0001 7 19.0001L17 19.0001C18.1046 19.0001 19 18.1047 19 17.0001V16.0001"
                strokeWidth="2"
                stroke="currentColor"
            />
        </svg>
    );
};

export default DownloadIcon;