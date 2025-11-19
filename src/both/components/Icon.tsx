import { tw } from '@both/funcs/tw'
import { icons } from '@both/states/icons'
import { CSSProperties, ReactNode, useMemo } from 'react'

interface IconProps {
    className?: string
    style?: CSSProperties
    name?: string
}

const emptyGlyph: string = '!'

export function Icon({ className, style, name }: IconProps): ReactNode {
    const glyph = useMemo<string>(() => {
        if (typeof name !== 'string') return emptyGlyph
        const charCode = icons.indexOf(name) + 0x21
        return String.fromCharCode(charCode)
    }, [name])

    return (
        <span className={tw('inline-flex font-[VibeOS-Icons]', className)} style={style}>
            {glyph}
        </span>
    )
}
