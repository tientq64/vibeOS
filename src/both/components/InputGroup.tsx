import { tw } from '@both/funcs/tw'
import { CSSProperties, ReactNode } from 'react'

interface InputGroupProps {
    className?: string
    style?: CSSProperties
    children?: ReactNode
}

export function InputGroup({ className, style, children }: InputGroupProps): ReactNode {
    return (
        <div
            className={tw('*:rounded-none *:first:rounded-l *:last:rounded-r', className)}
            style={style}
        >
            {children}
        </div>
    )
}
