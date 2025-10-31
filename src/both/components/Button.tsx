interface ButtonProps {
    className?: string
    type?: ButtonHTMLAttributes['type']
    disabled?: boolean
    color?: ColorName
    size?: SizeName
    fill?: boolean
    icon?: string | ReactNode
    rightIcon?: string | ReactNode
    onClick?: HTMLAttributes['onClick']
    children?: ReactNode
}

function Button({
    className,
    type = 'button',
    disabled,
    color = ColorName.Zinc,
    size = SizeName.Md,
    fill,
    icon,
    rightIcon,
    onClick,
    children,
    ...props
}: ButtonProps): ReactNode {
    const colorObj = useMemo(() => getColor(color), [color])
    const sizeObj = useMemo(() => getSize(size), [size])

    return (
        <button
            {...props}
            className={tw(
                'mb-0.5 inline-flex items-center justify-center gap-2 rounded border-2 px-2 pb-0.5 shadow-[0_2px] active:translate-y-0.5 active:shadow-none',
                colorObj.className,
                sizeObj.buttonClassName,
                fill && 'flex w-full',
                disabled && 'pointer-events-none opacity-50',
                className
            )}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {isString(icon) ? <Icon name={icon} /> : icon}
            {children}
            {isString(rightIcon) ? <Icon name={rightIcon} /> : rightIcon}
        </button>
    )
}
