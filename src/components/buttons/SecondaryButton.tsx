import Button from "@mui/material/Button";
import React from "react";
import styles from "../../styles/components/buttons/SecondaryButton.module.css"

interface SecondaryButtonProps {
    handleClick: () => void; // Correctly type the handleClick as a function
    title: string;
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ handleClick, title, leftIcon, rightIcon }) => {
    return (
        <button
            onClick={handleClick}
            className={styles.secondaryButtonContainer}
        >
            {leftIcon && <span className="icon">{leftIcon}</span>}
            {title}
            {rightIcon && <span className="icon">{rightIcon}</span>}
        </button>
    );
}

export default SecondaryButton;