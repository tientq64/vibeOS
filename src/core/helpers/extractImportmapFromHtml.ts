import { isString } from '@both/funcs/isString'
import { parseHtml } from '@both/funcs/parseHtml'
import { Obj } from '@both/types/types'
import { object } from 'yup'

export interface Importmap {
    imports: Obj<string>
}

export function extractImportmapFromHtml(html: string): Importmap {
    const doc = parseHtml(html)

    const script = doc.querySelector('script')
    if (script === null) {
        throw Error('Không tìm thấy thẻ importmap script')
    }
    const importmapRaw: unknown = JSON.parse(script.text)

    const importmapSchema = object({
        imports: object()
            .required()
            .test('valid', (obj) => {
                return Object.values(obj).every((val) => isString(val))
            })
    }).noUnknown()

    const importmap: Importmap = importmapSchema.validateSync(importmapRaw)
    return importmap
}
