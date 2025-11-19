import { doms } from '@both/states/doms'
import { SubMenuPopup } from '@core/components/SubMenuPopup'
import { TooltipPopup } from '@core/components/TooltipPopup'
import { useMemoizedFn } from 'ahooks'
import { ReactNode } from 'react'

export function Popups(): ReactNode {
    const popupsRefCallback = useMemoizedFn((popupsEl: HTMLDivElement | null) => {
        if (popupsEl === null) return
        doms.popupsEl = popupsEl
    })

    return (
        <div ref={popupsRefCallback}>
            <SubMenuPopup />
            <TooltipPopup />
        </div>
    )
}
