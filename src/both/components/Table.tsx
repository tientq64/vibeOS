interface TableProps {
    children?: ReactNode
}

function Table({ children }: TableProps): ReactNode {
    return (
        <div
            className={clsx(
                '[&_tbody>tr]:odd:bg-zinc-800',
                '[&_tbody>tr]:hover:bg-zinc-700',
                '[&_tbody>tr:hover>td]:first:rounded-l [&_tbody>tr:hover>td]:last:rounded-r',
                '[&_tr]:h-8',
                '[&_th]:text-left [&_th]:font-normal'
            )}
        >
            <table className="w-full">{children}</table>
        </div>
    )
}
