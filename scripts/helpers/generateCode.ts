import { generateFuncsFile } from './generateFuncsFile'
import { generatePathsFile } from './generatePathsFile'

export function generateCode(changedPath?: string): void {
    generatePathsFile()
    generateFuncsFile()

    console.log(`Đã tạo lại code. Path thay đổi: ${changedPath}`)
}
