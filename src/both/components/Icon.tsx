interface IconProps extends HTMLAttributes {
    name: string
}

function Icon({ className, name, ...props }: IconProps): ReactNode {
    const glyph = useMemo<string>(() => {
        const charCode = icons.indexOf(name)
        if (charCode < 0) return ' '
        return String.fromCharCode(charCode)
    }, [name])

    return (
        <span {...props} className={clsx('inline-flex font-[VibeOSIcon]', className)}>
            {glyph}
        </span>
    )
}
