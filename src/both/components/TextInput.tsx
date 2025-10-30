interface TextInputProps {
    className?: string
    style?: CSSProperties
    name?: string
    fill?: boolean
    placeholder?: string
    value?: string
    element?: ReactElement
    rightElement?: ReactElement
    onChange?: ChangeEventHandler
}

function TextInput({
    className,
    style,
    name,
    fill,
    placeholder,
    element,
    rightElement,
    value,
    onChange
}: TextInputProps): ReactNode {
    return (
        <div
            className={tw(
                'inline-flex h-8 w-64 rounded bg-zinc-800 shadow-[inset_0_2px] shadow-zinc-950 *:rounded-none *:first:rounded-l *:last:rounded-r',
                fill && 'flex w-auto',
                className
            )}
            style={style}
        >
            {element}
            <input
                className={clsx(
                    'h-full min-w-0 flex-1 px-2 shadow-inner outline-none',
                    fill && 'w-full'
                )}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {rightElement}
        </div>
    )
}
