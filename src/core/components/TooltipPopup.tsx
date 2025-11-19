import { createPopper } from '@both/funcs/createPopper'
import { useOS } from '@core/hooks/useOS'
import { ReactNode, useEffect, useRef } from 'react'

export function TooltipPopup(): ReactNode {
    const {
        tooltip: { text, rect }
    } = useOS()
    const floatingRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (text === '') return
        if (!rect || !floatingRef.current) return
        createPopper(rect, floatingRef.current, {
            inlineAddedCrossOffset: 2
        })
    }, [text, rect])

    if (text === '') return null

    return (
        <div
            ref={floatingRef}
            className="vibe-popper-cloak pointer-events-none z-8000 w-fit max-w-128 rounded-md border-b-2 border-neutral-950 bg-neutral-800 px-3 py-1"
        >
            {text}
        </div>
    )
}
