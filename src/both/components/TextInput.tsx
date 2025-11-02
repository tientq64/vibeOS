interface TextInputProps {
    className?: string
    style?: CSSProperties
    name?: string
    fill?: boolean
    placeholder?: string
    defaultValue?: string
    value?: string
    element?: ReactElement
    rightElement?: ReactElement
    onChange?: ChangeEventHandler
    onValueChange?: (value: string) => void
}

function TextInput({
    className,
    style,
    name,
    fill,
    placeholder,
    element,
    rightElement,
    defaultValue,
    value,
    onChange,
    onValueChange
}: TextInputProps): ReactNode {
    const [controllableValue, setControllableValue] = useControllableValue<string>({
        defaultValue,
        value
    })

    const handleInputChange = (event: ChangeEvent): void => {
        const { value } = event.target
        setControllableValue(value)
        onChange?.(event)
        onValueChange?.(value)
    }

    return (
        <div
            className={tw(
                'inline-flex h-8 w-64 rounded bg-neutral-800 shadow-[inset_0_2px] shadow-neutral-950 *:rounded-none *:first:rounded-l *:last:rounded-r',
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
                autoComplete="both"
                placeholder={placeholder}
                defaultValue={defaultValue}
                value={controllableValue}
                onChange={handleInputChange}
            />
            {rightElement}
        </div>
    )
}
