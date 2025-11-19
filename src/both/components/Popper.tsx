import { cloneElement } from '@both/funcs/cloneElement'
import { omitUndef } from '@both/funcs/omitUndef'
import { safeCall } from '@both/funcs/safeCall'
import { useControllableValue } from 'ahooks'
import { MouseEvent, ReactElement, ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface PopperProps {
    defaultIsOpen?: boolean
    isOpen?: boolean
    onOpenChange?(isOpen: boolean): void
    content?: ReactNode
    children?: ReactElement
}

export function Popper({
    defaultIsOpen,
    isOpen: rawIsOpen,
    onOpenChange,
    content,
    children
}: PopperProps): ReactNode {
    const [isOpen, setIsOpen] = useControllableValue(
        omitUndef({
            defaultIsOpen,
            isOpen: rawIsOpen,
            onOpenChange
        }),
        {
            defaultValuePropName: 'defautIsOpen',
            valuePropName: 'isOpen',
            trigger: 'onOpenChange'
        }
    )

    return (
        <>
            {cloneElement(children, (props) => ({
                onClick: (event: MouseEvent) => {
                    safeCall(props.onClick, event)
                    setIsOpen(!isOpen)
                }
            }))}

            {isOpen && createPortal(content, document.body)}
        </>
    )
}
