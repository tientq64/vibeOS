interface InputGroupProps {
    className?: string
    style?: CSSProperties
    children?: ReactNode
}

function InputGroup({ className, style, children }: InputGroupProps): ReactNode {
    return (
        <div
            className={tw('*:rounded-none *:first:rounded-l *:last:rounded-r', className)}
            style={style}
        >
            {children}
        </div>
    )
}
