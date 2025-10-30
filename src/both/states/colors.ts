enum ColorName {
    Zinc = 'zinc',
    Red = 'red',
    Amber = 'amber',
    Green = 'green',
    Blue = 'blue'
}

interface Color {
    name: string
    className: string
}

const colors: Color[] = ref([
    {
        name: ColorName.Zinc,
        className: clsx('border-zinc-500 bg-zinc-600 shadow-zinc-500')
    },
    {
        name: ColorName.Red,
        className: clsx('border-red-400 bg-red-600 shadow-red-400')
    },
    {
        name: ColorName.Amber,
        className: clsx('border-amber-400 bg-amber-600 shadow-amber-400')
    },
    {
        name: ColorName.Green,
        className: clsx('border-green-400 bg-green-600 shadow-green-400')
    },
    {
        name: ColorName.Blue,
        className: clsx('border-blue-400 bg-blue-600 shadow-blue-400')
    }
])
