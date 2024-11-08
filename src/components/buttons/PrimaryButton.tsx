import Button from "@mui/material/Button";
import React from "react";
import styles from "../../styles/components/buttons/PrimaryButton.module.css";

interface PrimaryButtonProps {
    handleClick: () => void; // Correctly type the handleClick as a function
    title: string;
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ handleClick, title, leftIcon, rightIcon }) => {
    return (
        <button
            onClick={handleClick}
            className={styles.primaryButtonContainer}
        >
            {leftIcon && <span className="icon">{leftIcon}</span>}
            {title}
            {rightIcon && <span className="icon">{rightIcon}</span>}
        </button>
    );
}

export default PrimaryButton;