function getAppType(name: AppTypeName): AppType
function getAppType(name: any): AppType | undefined

function getAppType(name: AppTypeName | any): AppType | undefined {
    return appTypes.find((appType) => appType.name === name)
}
