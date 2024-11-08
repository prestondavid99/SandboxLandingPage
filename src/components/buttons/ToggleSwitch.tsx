// components/ToggleSwitch.tsx
import { useState } from 'react'
import styles from '../../styles/components/buttons/toggle-switch.module.css'

interface ToggleSwitchProps {
    defaultChecked?: boolean
    onChange?: (checked: boolean) => void
    label?: string
    disabled?: boolean
}

export default function ToggleSwitch({
                                         defaultChecked = false,
                                         onChange,
                                         label,
                                         disabled = false
                                     }: ToggleSwitchProps) {
    const [isChecked, setIsChecked] = useState(defaultChecked)

    const handleToggle = () => {
        if (disabled) return
        const newValue = !isChecked
        setIsChecked(newValue)
        onChange?.(newValue)
    }

    return (
        <div className={styles.toggleWithTitleContainer}>
            <div className={styles.toggleContainer}>
                <button
                    role="switch"
                    aria-checked={isChecked}
                    onClick={handleToggle}
                    className={`${styles.toggle} ${isChecked ? styles.active : ''} ${
                        disabled ? styles.disabled : ''
                    }`}
                    disabled={disabled}
                >
                    <span className={styles.slider}/>
                </button>
                {label && <span className={styles.label}>{label}</span>}
            </div>
        </div>

    )
}