interface IconProps extends HTMLAttributes {
    name: string
}

function Icon({ className, name, ...props }: IconProps): ReactNode {
    const glyph = useMemo<string>(() => {
        const charCode = icons.indexOf(name)
        return String.fromCharCode(charCode + 0x22)
    }, [name])

    return (
        <span
            {...props}
            className={clsx('font-pixel-adjust-11 inline-flex font-[VibeOS-Icons]', className)}
        >
            {glyph}
        </span>
    )
}
