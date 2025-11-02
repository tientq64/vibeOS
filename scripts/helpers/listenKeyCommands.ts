import { createInterface } from 'readline'
import { generateCode } from './generateCode'
import { startDevServer } from './startDevServer'

export function listenKeyCommands(): void {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    })

    console.log()
    console.log('Các lệnh:')
    console.log('[r] Khởi động lại dev server.')
    console.log('[g] Tạo lại code.')
    console.log()

    rl.on('line', (input) => {
        input = input.trim()

        switch (input) {
            case 'r':
                startDevServer()
                break

            case 'g':
                generateCode()
                break

            default:
                console.log('Lệnh không xác định.')
                break
        }
    })
}
