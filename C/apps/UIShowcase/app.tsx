import { Button } from '@both/components/Button'
import { Icon } from '@both/components/Icon'
import { Menu } from '@both/components/Menu'
import { Popper } from '@both/components/Popper'
import { TextInput } from '@both/components/TextInput'
import { Tooltip } from '@both/components/Tooltip'
import { MenuItemInput } from '@both/funcs/makeMenu'
import { ColorName } from '@both/states/colors'
import { ts } from '@task/store/ts'
import { useRequest } from 'ahooks'
import { ReactNode, useMemo } from 'react'

export function App(): ReactNode {
    const readDir = useRequest(async () => {
        return await ts.readDir('/C')
    })

    const menuItems = useMemo<MenuItemInput[]>(() => {
        return [
            ,
            ,
            ,
            { text: 'Mở', color: ColorName.Blue },
            {
                text: 'Mở bằng...',
                subItems: [
                    { text: 'Notepad' }, //
                    { text: 'Paint' },
                    ,
                    ,
                    {
                        text: 'Các ứng dụng khác',
                        icon: 'user-circle',
                        subItems: [
                            { text: 'VSCode' },
                            { text: 'Microsoft Edge' },
                            { text: 'Terminal' }
                        ]
                    }
                ]
            },
            ,
            { header: 'Chỉnh sửa' },
            { text: 'Copy', icon: 'copy', label: 'Ctrl+C' },
            { text: 'Cắt', icon: 'scissors', label: 'Ctrl+X' },
            ,
            { text: 'Xóa', color: ColorName.Red, label: 'Delete' },
            ,
            ,
            ,
            { text: 'Thông tin ứng dụng', icon: 'circle-info' },
            ,
            ,
        ]
    }, [])

    return (
        <div className="h-full overflow-x-hidden p-1 scheme-dark *:m-1">
            <Button>Test</Button>
            <Button fill>Fill...</Button>

            <TextInput />
            <TextInput
                placeholder="Nhập tìm kiếm..."
                rightElement={
                    <Tooltip content="Nhấn để tìm kiếm...">
                        <Button icon="search" />
                    </Tooltip>
                }
            />
            <TextInput fill />

            <Popper
                content={
                    <div>
                        <div>Nhập tên</div>
                        <TextInput fill value="Trần Dần" />
                        <div className="text-right">
                            <Button>Thêm</Button>
                        </div>
                    </div>
                }
            >
                <Button>Tạo mới</Button>
            </Popper>

            <Tooltip content="Nội dung tooltip|top">
                <div className="inline-flex h-16 w-24 rounded border-2 hover:border-orange-300">
                    Tooltip
                </div>
            </Tooltip>

            <Menu items={menuItems} />

            <div>
                {readDir.data?.map((ent) => (
                    <div className="row justify-start">
                        <Icon name={ent.icon} />
                        {ent.path}
                    </div>
                ))}
            </div>
        </div>
    )
}
