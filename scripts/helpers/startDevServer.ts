import { shutdown, start } from 'live-server'

export function startDevServer(): void {
    shutdown()

    start({
        host: 'localhost',
        port: 5500,
        open: false,
        logLevel: 0,
        middleware: [
            (req, res, next) => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                next()
            }
        ]
    })
    console.log('Đã khởi động dev server.')
}
