import dayjs, { Dayjs } from 'dayjs'

export function formatTime(time: Dayjs | Date | string | number, template?: string): string {
    return dayjs(time).format(template)
}
