import { exec } from 'child_process'
import { createInterface } from 'readline'
import { generateCode } from './generateCode'
import { host, port, startDevServer } from './startDevServer'

export function listenKeyCommands(): void {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    })

    console.log()
    console.log('Các lệnh:')
    console.log('[o] Mở trong trình duyệt.')
    console.log('[r] Khởi động lại dev server.')
    console.log('[g] Tạo lại code.')
    console.log()

    rl.on('line', (input) => {
        input = input.trim()

        switch (input) {
            case 'o':
                exec(`start http://${host}:${port}`)
                break

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
