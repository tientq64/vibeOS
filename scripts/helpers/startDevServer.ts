import { start } from 'live-server'

export function startDevServer(): void {
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
}
