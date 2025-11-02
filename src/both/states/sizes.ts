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
        buttonClassName: 'h-[26px]'
    },
    {
        name: SizeName.Md,
        className: 'h-8',
        buttonClassName: 'h-[30px]'
    },
    {
        name: SizeName.Lg,
        className: 'h-10',
        buttonClassName: 'h-[38px]'
    }
]
