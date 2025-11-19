import { MenuItem } from '@both/funcs/makeMenu'
import { Rect } from '@both/funcs/makeRect'
import { ref } from '@both/funcs/ref'
import { proxy } from 'valtio'

export interface SubMenu {
    id: string
    items: MenuItem[]
    rect: Rect | undefined
}

export const subMenu = proxy<SubMenu>({
    id: '',
    items: ref([]),
    rect: undefined
})
