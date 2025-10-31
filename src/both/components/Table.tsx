interface TableProps {
    className?: string
    children?: ReactNode
}

function Table({ className, children }: TableProps): ReactNode {
    return (
        <div
            className={tw(
                'rounded scheme-dark',
                '[&_thead]:sticky [&_thead]:top-0 [&_thead]:bg-zinc-900',
                '[&_tbody>tr]:odd:bg-zinc-800/25',
                '[&_tbody>tr]:hover:bg-zinc-700',
                '[&_tbody>tr:hover>td]:first:rounded-l [&_tbody>tr:hover>td]:last:rounded-r',
                '[&_tr]:h-8',
                '[&_th]:text-left [&_th]:font-normal',
                className
            )}
        >
            <table className="w-full">{children}</table>
        </div>
    )
}
