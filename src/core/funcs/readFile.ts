function readFile(
    this: MaybeTask,
    path: string | Ent,
    type: ReadFileDataType.DataUrl
): Promise<string>
function readFile(
    this: MaybeTask,
    path: string | Ent,
    type: ReadFileDataType.Buffer
): Promise<ArrayBuffer>
function readFile(this: MaybeTask, path: string | Ent, type: ReadFileDataType.Blob): Promise<Blob>
function readFile(this: MaybeTask, path: string | Ent, type: ReadFileDataType.File): Promise<File>
function readFile(
    this: MaybeTask,
    path: string | Ent,
    type?: ReadFileDataType.Text
): Promise<string>

async function readFile(
    this: MaybeTask,
    path: string | Ent,
    type?: ReadFileDataType
): Promise<string | ArrayBuffer | Blob | File> {
    path = entToPath(path)

    const data = await fs.readFile(path, { type: type as any })
    return data
}
