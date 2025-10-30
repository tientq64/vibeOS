function getColor(name: ColorName): Color
function getColor(name: unknown): Color | undefined

function getColor(name: unknown): Color | undefined {
    return colors.find((color) => color.name === name)
}
