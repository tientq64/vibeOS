import { LiveServerParams, shutdown, start } from 'live-server'

export const { host, port }: LiveServerParams = {
    host: 'localhost',
    port: 5500
}

export function startDevServer(): void {
    shutdown()

    start({
        host,
        port,
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
