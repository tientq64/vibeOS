import { tw } from '@both/funcs/tw'
import { useUniqId } from '@both/hooks/useUniqId'
import { ReactNode } from 'react'

interface TableProps {
    className?: string
    fixed?: (number | string)[]
    noWrap?: boolean
    children?: ReactNode
}

export function Table({ className, fixed, noWrap, children }: TableProps): ReactNode {
    const tableId = useUniqId()

    return (
        <div
            className={tw(
                tableId,
                'rounded scheme-dark',
                '[&_thead]:sticky [&_thead]:top-0 [&_thead]:bg-neutral-900 [&_thead>tr]:border-b-2',
                '[&_tbody>tr]:even:bg-neutral-800/50',
                '[&_tbody>tr]:hover:bg-neutral-600/50',
                '[&_tbody>tr:hover>td]:first:rounded-l [&_tbody>tr:hover>td]:last:rounded-r',
                '[&_tr]:h-8',
                '[&_th]:text-left [&_th]:font-normal',
                '[&_th,&_td]:px-3',
                fixed &&
                    '[&_tbody_td,&_thead_th]:py-1 [&_tbody>tr]:h-auto [&_thead]:w-full [&_tr]:flex [&_tr]:items-center',
                noWrap && '[&_td]:truncate [&_th]:truncate',
                className
            )}
        >
            <table className="w-full">{children}</table>

            {fixed && (
                <style>
                    {`
                        .${tableId} {
                            :is(th, td) {
                                ${fixed
                                    .map((width, i) => {
                                        return `
                                        &:nth-child(${i + 1}) {
                                            flex: ${width} 1 0%;
                                        }
                                    `
                                    })
                                    .join('\n')}
                            }
                        }
                    `}
                </style>
            )}
        </div>
    )
}
