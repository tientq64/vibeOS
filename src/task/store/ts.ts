import { coreFuncNames } from '@both/constants/funcNames'
import { uniqId } from '@both/funcs/uniqId'
import { bothMembers, type BothMember } from '@both/store/store'
import { type CoreAsyncFuncs } from '@core/store/store'
import { secret } from '@task/constants/secret'
import { taskSend } from '@task/helpers/taskSend'
import { taskMembers, type TaskMember } from '@task/store/store'
import { proxy } from 'valtio'

export type TS = BothMember & TaskMember & CoreAsyncFuncs

export const ts = proxy<TS>({
    ...bothMembers,
    ...taskMembers,
    ...(Object.fromEntries(
        coreFuncNames.map((funcName) => {
            return [
                funcName,
                async function <T>(...funcArgs: unknown[]): Promise<T | undefined> {
                    return taskSend({
                        messageId: uniqId(),
                        isRequest: true,
                        secretId: secret.secretId,
                        funcName,
                        funcArgs
                    })
                }
            ]
        })
    ) as CoreAsyncFuncs)
})
