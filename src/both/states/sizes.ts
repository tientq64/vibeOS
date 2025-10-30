enum SizeName {
    Sm = 'sm',
    Md = 'md',
    Lg = 'lg'
}

interface Size {
    name: SizeName
    className: string
    buttonClassName: string
}

const sizes: Size[] = [
    {
        name: SizeName.Sm,
        className: 'h-7',
        buttonClassName: 'h-[calc(theme(height.7)-2px)]'
    },
    {
        name: SizeName.Md,
        className: 'h-8',
        buttonClassName: 'h-[calc(theme(height.8)-2px)]'
    },
    {
        name: SizeName.Lg,
        className: 'h-10',
        buttonClassName: 'h-[calc(theme(height.10)-2px)]'
    }
]
