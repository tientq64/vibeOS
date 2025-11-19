import { ref } from '@both/funcs/ref'

export const enum AppTypeName {
    OS = 'os',
    Core = 'core',
    Normal = 'normal'
}

export interface AppType {
    name: AppTypeName
    text: string
}

export const appTypes: AppType[] = ref([
    {
        name: AppTypeName.OS,
        text: 'Hệ điều hành'
    },
    {
        name: AppTypeName.Core,
        text: 'Hệ thống'
    },
    {
        name: AppTypeName.Normal,
        text: 'Thường'
    }
])
