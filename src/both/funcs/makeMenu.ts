import { getColor } from '@both/funcs/getColor'
import { isFunction } from '@both/funcs/isFunction'
import { ColorName, defaultColor } from '@both/states/colors'

export interface MenuButton {
    id: string
    type: 'button'
    text: string
    icon?: string
    color: ColorName
    label?: string
    click?: string
    subItems: MenuItem[]
}

export interface MenuHeader {
    id: string
    type: 'header'
    header: string
}

export interface MenuDivider {
    id: string
    type: 'divider'
}

export interface MenuButtonInput {
    text: string
    icon?: string
    color?: ColorName
    label?: string
    click?: Function
    subItems?: MenuItemInput[]
}

export interface MenuHeaderInput {
    header: string
}

export type MenuDividerInput = undefined

export type MenuItem = MenuButton | MenuHeader | MenuDivider
export type MenuItemInput = MenuButtonInput | MenuHeaderInput | MenuDividerInput

export type MenuClicksMap = {
    [clickId: string]: Function
}

export interface Menu {
    id: string
    items: MenuItem[]
    clicksMap: MenuClicksMap
}

export interface MenuInput {
    id: string
    items: (MenuItemInput | MenuItem)[]
    clicksMap: MenuClicksMap
}

export function makeMenu(menu: MenuInput | Menu) {
    let items: MenuItem[] = []
    const clicksMap: MenuClicksMap = { ...menu.clicksMap }
    const id: string = menu.id
    let count: number = 0

    for (let input of menu.items) {
        let itemId: string = `${menu.id}/${count}`
        let item: MenuItem | undefined
        count++

        if (input === undefined) {
            input = {
                id: itemId,
                type: 'divider'
            }
        }
        if ('id' in input) {
            itemId = input.id
        }
        if ('header' in input) {
            item = {
                id: itemId,
                ...input,
                type: 'header'
            }
        } else if ('text' in input) {
            let subItems: MenuItem[] = []
            if (input.subItems) {
                const subMenu = makeMenu({
                    items: input.subItems,
                    clicksMap: {},
                    id: itemId
                })
                subItems = subMenu.items
                Object.assign(clicksMap, subMenu.clicksMap)
            }
            let click = input.click
            if (isFunction(click)) {
                clicksMap[itemId] = click
                click = itemId
            }
            item = {
                id: itemId,
                ...input,
                type: 'button',
                color: getColor(input.color)?.name ?? defaultColor.name,
                click,
                subItems
            }
        } else {
            item = { ...input }
        }
        if (item) {
            items.push(item)
        }
    }
    items = organizeItems(items)

    return {
        items,
        clicksMap,
        id
    }
}

function organizeItems(items: MenuItem[]): MenuItem[] {
    const newItems: MenuItem[] = []

    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const nextItem = items.at(i + 1)

        if (item.type === 'divider') {
            if (newItems.length === 0) continue
            if (nextItem === undefined) continue
            if (nextItem.type === 'divider') continue
            if (nextItem.type === 'header') continue
        }
        newItems.push(item)
    }
    return newItems
}
