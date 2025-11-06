import { time } from '@both/states/time'

export function updateUnixTime(): void {
    time.unixTime = Date.now()
}
