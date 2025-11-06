import { find } from '@both/funcs/find'
import { AppType, AppTypeName, appTypes } from '@both/states/appTypes'

export function getAppType(name: AppTypeName): AppType
export function getAppType(name: any): AppType | undefined

export function getAppType(name: AppTypeName | any): AppType | undefined {
    return find(appTypes, { name })
}
