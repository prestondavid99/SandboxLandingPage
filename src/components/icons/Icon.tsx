// components/Icon.jsx
import React, { SVGProps } from 'react'
import CalenderIcon from '@/assets/icons/Icon=Calender.svg'
import RefreshIcon from '@/assets/icons/Icon=Refresh.svg'
import DownloadIcon from '@/components/icons/DownloadIcon'
import ExpandArrow from '@/assets/icons/Icon=ExpandArrow.svg'

export type IconName = 'calender' | 'refresh' | 'download' | 'expandArrow'

interface IconProps extends SVGProps<SVGSVGElement> {
    name: IconName
    className?: string
}

// Create a record of icon components
const icons: Record<IconName, React.FC<SVGProps<SVGSVGElement>>> = {
    calender: CalenderIcon,
    refresh: RefreshIcon,
    download: DownloadIcon,
    expandArrow: ExpandArrow,
}

export default function Icon({ name, ...props }: IconProps): JSX.Element | null {
    const IconComponent = icons[name]

    if (!IconComponent) return null

    return <IconComponent {...props} />
}