import { uniqId } from '@both/funcs/uniqId'
import { MaybeTask } from '@both/states/tasks'

export function getFrameInit(this: MaybeTask) {
    if (!this) return

    const newSecretId: string = uniqId()
    const args = { ...this.args }

    this.secretId = newSecretId

    return {
        secretId: newSecretId,
        args
    }
}
