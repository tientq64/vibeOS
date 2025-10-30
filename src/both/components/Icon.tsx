interface IconProps extends HTMLAttributes {
    name: string
}

function Icon({ className, name, ...props }: IconProps): ReactNode {
    const glyph = useMemo<string>(() => {
        return String.fromCharCode(icons.indexOf(name))
    }, [name])

    return (
        <span {...props} className={clsx('inline-flex font-[VibeOSIcon]', className)}>
            {glyph}
        </span>
    )
}
