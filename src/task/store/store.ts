import { MakePromiseReturn } from '@both/types/types'
import { args } from '@task/states/args'
export const taskFuncs = {  }
export type TaskFuncs = typeof taskFuncs
export type TaskAsyncFuncs = {
}
export const taskMembers = { ...taskFuncs, args }
export type TaskMember = typeof taskMembers