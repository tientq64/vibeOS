import { Button } from '@both/components/Button'
import { Icon } from '@both/components/Icon'
import { InputGroup } from '@both/components/InputGroup'
import { Table } from '@both/components/Table'
import { TextInput } from '@both/components/TextInput'
import { Ent } from '@both/constants/ents'
import { absPath } from '@both/funcs/absPath'
import { dirPath } from '@both/funcs/dirPath'
import { formatTime } from '@both/funcs/formatTime'
import { getArgs } from '@task/helpers/getArgs'
import { ts } from '@task/store/ts'
import { useHistoryTravel, useRequest, useSet } from 'ahooks'
import { filesize } from 'filesize'
import { FormEvent, PointerEvent, ReactNode, useEffect, useMemo, useState } from 'react'
import { bool, mixed, string } from 'yup'

interface Position {
    x: number
    y: number
}

type ViewMode = 'list' | 'tiles'

const { isDesktop, path, viewMode } = await getArgs({
    isDesktop: bool().default(false),
    path: string().transform(absPath).default('/'),
    viewMode: mixed<ViewMode>().oneOf(['list', 'tiles']).default('list')
})

export function App(): ReactNode {
    const [inputPath, setInputPath] = useState<string>(path)
    const hist = useHistoryTravel(path, 1000)
    const [selectedEnts, setSelectedEnts] = useSet<Ent>()
    const [selectAnchor, setSelectAnchor] = useState<Position | undefined>(undefined)
    const [selectCurrent, setSelectCurrent] = useState<Position | undefined>(undefined)

    const currentPath = useMemo<string>(() => {
        return absPath(hist.value ?? path)
    }, [hist.value])

    const req = useRequest(
        async () => {
            if (hist.value === undefined) return
            return ts.readDir(currentPath)
        },
        { manual: true }
    )

    const selectRect = useMemo<DOMRect | undefined>(() => {
        if (selectAnchor === undefined || selectCurrent === undefined) return
        const x = Math.min(selectAnchor.x, selectCurrent.x)
        const y = Math.min(selectAnchor.y, selectCurrent.y)
        const width = Math.abs(selectAnchor.x - selectCurrent.x)
        const height = Math.abs(selectAnchor.y - selectCurrent.y)
        return new DOMRect(x, y, width, height)
    }, [selectAnchor, selectCurrent])

    const handleContentPointerDown = (event: PointerEvent): void => {
        event.currentTarget.setPointerCapture(event.pointerId)
        setSelectAnchor({
            x: event.clientX,
            y: event.clientY
        })
    }

    const handleContentPointerMove = (event: PointerEvent): void => {
        if (!selectAnchor) return
        setSelectCurrent({
            x: event.clientX,
            y: event.clientY
        })
    }

    const handleContentPointerUp = (): void => {
        setSelectAnchor(undefined)
        setSelectCurrent(undefined)
    }

    const handlePathSubmit = (event: FormEvent): void => {
        event.preventDefault()
        const newCurrentPath: string = absPath(inputPath)
        if (currentPath === newCurrentPath) {
            setInputPath(newCurrentPath)
            req.refresh()
            return
        }
        hist.setValue(newCurrentPath)
    }

    useEffect(() => {
        setInputPath(currentPath)
        req.run()
    }, [currentPath])

    return (
        <div
            className="column h-full"
            style={{
                background: isDesktop
                    ? 'url(https://cdn.jsdelivr.net/gh/tientq64/data/gradient.jpg) center/cover no-repeat'
                    : undefined
            }}
        >
            {!isDesktop && (
                <div className="row z-1 gap-2 bg-neutral-900 p-2 pb-0">
                    <InputGroup>
                        <Button
                            icon="arrow-left"
                            disabled={hist.backLength <= 0}
                            onClick={() => hist.back()}
                        />
                        <Button
                            icon="arrow-right"
                            disabled={hist.forwardLength <= 0}
                            onClick={() => hist.forward()}
                        />
                        <Button
                            icon="arrow-up"
                            disabled={hist.value === undefined || hist.value === '/'}
                            onClick={() => hist.setValue(dirPath(currentPath))}
                        />
                    </InputGroup>

                    <Button icon="reload" onClick={() => req.refresh()} />

                    <form className="flex-1" onSubmit={handlePathSubmit}>
                        <TextInput
                            name="path"
                            fill
                            value={inputPath}
                            onValueChange={setInputPath}
                            rightElement={<Button type="submit" icon="key-enter" />}
                        />
                    </form>
                </div>
            )}

            <div
                className="relative flex-1 overflow-hidden p-2"
                onPointerDown={handleContentPointerDown}
                onPointerMove={handleContentPointerMove}
                onPointerUp={handleContentPointerUp}
            >
                {viewMode === 'list' && (
                    <Table className="max-h-full overflow-x-hidden" fixed={[4, 1, 2]} noWrap>
                        <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Kích thước</th>
                                <th>Ngày sửa đổi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {req.data?.map((ent) => (
                                <tr key={ent.path}>
                                    <td className="flex items-center gap-2">
                                        <Icon name={ent.icon} />
                                        <div className="truncate">{ent.name}</div>
                                    </td>
                                    <td>{ent.isFile ? filesize(ent.size) : '-'}</td>
                                    <td>{formatTime(ent.mtime, 'DD-MM-YYYY HH:mm')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
                {viewMode === 'tiles' && (
                    <div className="grid h-full auto-cols-[120px] grid-flow-col grid-rows-[repeat(auto-fill,100px)] gap-1">
                        {req.data?.map((ent) => (
                            <div key={ent.path} className="col rounded hover:bg-neutral-600/50">
                                <Icon name={ent.icon} />
                                {ent.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectRect && (
                <div
                    className="pointer-events-none absolute rounded bg-blue-500/10 outline-2 outline-blue-500"
                    style={{
                        left: selectRect.x,
                        top: selectRect.y,
                        width: selectRect.width,
                        height: selectRect.height
                    }}
                />
            )}
        </div>
    )
}
