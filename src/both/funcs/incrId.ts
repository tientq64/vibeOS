import { incrIdState } from '@both/states/incrIdState'

export function incrId(): number {
    return ++incrIdState.value
}
