import { Icon } from '@both/components/Icon'
import { clsx } from '@both/funcs/clsx'
import { createPopper } from '@both/funcs/createPopper'
import { getColor } from '@both/funcs/getColor'
import { makeMenu, type Menu, MenuButton, MenuItem, MenuItemInput } from '@both/funcs/makeMenu'
import { Rect } from '@both/funcs/makeRect'
import { tw } from '@both/funcs/tw'
import { useUniqId } from '@both/hooks/useUniqId'
import {
    MouseEvent,
    ReactNode,
    ReactPortal,
    RefObject,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react'
import { createPortal } from 'react-dom'

interface MenuProps {
    ref?: RefObject<HTMLDivElement | null>
    className?: string
    elemId?: string
    rect?: Rect
    items: MenuItem[] | MenuItemInput[]
}

export function Menu({ ref, className, elemId: elemIdArg, rect, items }: MenuProps): ReactNode {
    const [elemId] = useUniqId(elemIdArg)
    const [activeItemId, setActiveItemId] = useState<string | undefined>()
    const menuRef = useRef<HTMLDivElement | null>(null)
    const [subMenuPortal, setSubMenuPortal] = useState<ReactPortal>()

    const menu = useMemo<Menu>(() => {
        return makeMenu({
            id: '',
            items,
            clicksMap: {}
        })
    }, [items])

    const handleMenuButtonMouseEnter = (item: MenuButton, event: MouseEvent): void => {
        const hasSubItems: boolean = item.subItems.length > 0

        if (hasSubItems) {
            setActiveItemId(item.id)
        } else if (item.type === 'button') {
            setActiveItemId(undefined)
        }
        if (rect) {
            if (hasSubItems) {
                const itemRect = event.currentTarget.getBoundingClientRect()
                const portal = createPortal(
                    <Menu
                        className="vibe-popper-cloak"
                        elemId={elemId}
                        rect={itemRect}
                        items={item.subItems}
                    />,
                    bs.doms.popupsEl
                )
                setSubMenuPortal(portal)
            } else {
                setSubMenuPortal(undefined)
            }
        } else {
            if (hasSubItems) {
                const itemRect = event.currentTarget.getBoundingClientRect()
                bs.showSubMenu(elemId, item.subItems, itemRect)
            } else {
                bs.closeSubMenu(elemId)
            }
        }
    }

    useEffect(() => {
        if (!rect || menuRef.current === null) return
        createPopper(rect, menuRef.current, {
            placement: 'right-start',
            crossOffset: -6
        })
    }, [!rect])

    return (
        <div
            ref={(el) => {
                menuRef.current = el
                if (ref) ref.current = el
            }}
            className={tw(
                'inline-flex flex-col',
                rect && 'rounded-md border-b-2 border-neutral-950 bg-neutral-800 p-1.5',
                className
            )}
            data-vibe-click-away={elemId}
        >
            {menu.items.map((item) => (
                <>
                    {item.type === 'button' && (
                        <div
                            key={item.id}
                            className={clsx(
                                'row min-h-7 gap-2 rounded px-2 hover:*:text-white',
                                getColor(item.color).menuItemClassName,
                                item.subItems.length === 0 && 'active:translate-y-0.5',
                                item.id === activeItemId && 'active *:text-white'
                            )}
                            onMouseEnter={(event) => handleMenuButtonMouseEnter(item, event)}
                        >
                            {item.icon && <Icon name={item.icon} />}
                            <div className="flex-1">{item.text}</div>
                            {item.subItems.length > 0 ? (
                                <Icon className="-mr-1.5 text-neutral-500" name="caret-right" />
                            ) : (
                                <div className="text-sm text-neutral-500">{item.label}</div>
                            )}
                        </div>
                    )}

                    {item.type === 'header' && (
                        <div
                            key={item.id}
                            className="flex min-h-7 items-center border-dashed px-2 text-sm text-neutral-500 not-first:mt-1.5 not-first:border-t-2"
                        >
                            {item.header}
                        </div>
                    )}

                    {item.type === 'divider' && (
                        <div key={item.id} className="my-1.5 border-b-2 border-dashed" />
                    )}
                </>
            ))}

            {subMenuPortal}
        </div>
    )
}
