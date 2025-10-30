function getSize(name: SizeName): Size
function getSize(name: unknown): Size | undefined

function getSize(name: unknown): Size | undefined {
    return sizes.find((size) => size.name === name)
}
