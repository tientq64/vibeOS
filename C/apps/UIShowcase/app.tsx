import { Button } from '@both/components/Button'
import { Icon } from '@both/components/Icon'
import { TextInput } from '@both/components/TextInput'
import { ts } from '@task/store/ts'
import { useRequest } from 'ahooks'
import { ReactNode } from 'react'

export function App(): ReactNode {
    const readDir = useRequest(async () => {
        return await ts.readDir('/C')
    })

    return (
        <div className="p-1 *:m-1">
            <Button>Test</Button>
            <Button fill>Fill...</Button>
            <TextInput />
            <TextInput placeholder="Nhập tìm kiếm..." rightElement={<Button icon="search" />} />
            <TextInput fill />
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
