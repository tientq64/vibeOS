import { noop } from '@both/funcs/noop'
import { resetAssign } from '@both/funcs/resetAssign'
import { secret } from '@task/constants/secret'
import { args } from '@task/states/args'
import { ts } from '@task/store/ts'

export async function initFrame(): Promise<void> {
    const data = await ts.getFrameInit()
    if (data === undefined) {
        throw Error('Không nhận được dữ liệu khởi tạo')
    }

    secret.secretId = data.secretId
    resetAssign(args, data.args)

    await ts.setFrameInited(true)

    ts.getFrameInit = noop as never
    ts.setFrameInited = noop as never
}
