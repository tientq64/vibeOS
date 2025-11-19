import { cloneElement } from '@both/funcs/cloneElement'
import { safeCall } from '@both/funcs/safeCall'
import { useUniqId } from '@both/hooks/useUniqId'
import { Obj } from '@both/types/types'
import { ReactElement, ReactNode, useRef } from 'react'

interface TooltipProps {
    content: string
    children?: ReactElement
}

export function Tooltip({ content, children }: TooltipProps): ReactNode {
    const [elemId] = useUniqId()
    const referenceRef = useRef<HTMLElement>(null)

    const handleReferenceMouseEnter = (props: Obj, ...args: unknown[]): void => {
        safeCall(props.onMouseEnter, ...args)
        if (referenceRef.current === null) return
        const rect = referenceRef.current.getBoundingClientRect()
        bs.showTooltip(elemId, content, rect)
    }

    const handleReferenceMouseLeave = (props: Obj, ...args: unknown[]): void => {
        safeCall(props.onMouseLeave, ...args)
        bs.closeTooltip(elemId)
    }

    return cloneElement(children, (props) => ({
        ref: referenceRef,
        onMouseEnter: handleReferenceMouseEnter.bind(null, props),
        onMouseLeave: handleReferenceMouseLeave.bind(null, props)
    }))
}
