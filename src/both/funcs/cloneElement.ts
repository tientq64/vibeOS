import { isFunction } from '@both/funcs/isFunction'
import { Obj } from '@both/types/types'
import { cloneElement as ReactCloneElement, ReactNode, isValidElement } from 'react'

export function cloneElement(el: ReactNode, getProps: ((props: Obj) => Obj) | Obj | void) {
    if (!isValidElement(el)) return el

    const props = (el.props || {}) as Obj

    return ReactCloneElement(el, {
        ...(isFunction(getProps) ? getProps?.(props) : getProps),
        ...props
    })
}
