import { coreFuncNames } from '@both/constants/funcNames'
import { uniqId } from '@both/funcs/uniqId'
import type { CoreAsyncFuncs } from '@core/store/store'
import { ts } from '@task/store/ts'

export function makeCoreAsyncFuncs(): CoreAsyncFuncs {
    const entries = coreFuncNames.map((funcName) => {
        return [
            funcName,
            async function <T>(...funcArgs: unknown[]): Promise<T | undefined> {
                return ts.send({
                    messageId: uniqId(),
                    isRequest: true,
                    secretId: ts.messenger.secretId,
                    funcName,
                    funcArgs
                })
            }
        ]
    })
    const funcs = Object.fromEntries(entries)
    return funcs
}
