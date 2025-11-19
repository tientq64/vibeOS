import { clsx } from '@both/funcs/clsx'
import { tw } from '@both/funcs/tw'
import { useControllableValue } from 'ahooks'
import { ChangeEvent, ChangeEventHandler, CSSProperties, ReactElement, ReactNode } from 'react'

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

export function TextInput({
    className,
    style,
    name,
    fill,
    placeholder,
    element,
    rightElement,
    defaultValue,
    value: rawValue,
    onChange,
    onValueChange
}: TextInputProps): ReactNode {
    const [value, setValue] = useControllableValue<string>({
        defaultValue,
        value: rawValue,
        onChange
    })

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const inputValue = event.target.value
        setValue(inputValue)
        onValueChange?.(inputValue)
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
                className={clsx('h-full min-w-0 flex-1 px-2 outline-none', fill && 'w-full')}
                name={name}
                autoComplete="both"
                placeholder={placeholder}
                defaultValue={defaultValue}
                value={value}
                onChange={handleInputChange}
            />
            {rightElement}
        </div>
    )
}
