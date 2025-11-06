import { tw } from '@both/funcs/tw'
import { icons } from '@both/states/icons'
import { CSSProperties, ReactNode, useMemo } from 'react'

interface IconProps {
    className?: string
    style?: CSSProperties
    name: string
}

export function Icon({ className, style, name }: IconProps): ReactNode {
    const glyph = useMemo<string>(() => {
        const charCode = icons.indexOf(name)
        return String.fromCharCode(charCode + 0x22)
    }, [name])

    return (
        <span
            className={tw('adjust-pixel-font-11 inline-flex font-[VibeOS-Icons]', className)}
            style={style}
        >
            {glyph}
        </span>
    )
}
