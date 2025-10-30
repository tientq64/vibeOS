enum AppTypeName {
    OS = 'os',
    Core = 'core',
    Normal = 'normal'
}

interface AppType {
    name: AppTypeName
    text: string
}

const appTypes: AppType[] = ref([
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
