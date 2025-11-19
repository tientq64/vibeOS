import { Menu } from '@both/components/Menu'
import { useOS } from '@core/hooks/useOS'
import { ReactNode } from 'react'

export function SubMenuPopup(): ReactNode {
    const {
        subMenu: { items, rect }
    } = useOS()

    if (items.length === 0 || rect === undefined) return null

    return <Menu rect={rect} items={items} />
}
