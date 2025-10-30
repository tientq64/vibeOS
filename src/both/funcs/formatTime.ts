function formatTime(time: Dayjs | Date | string | number, template?: string): string {
    return dayjs(time).format(template)
}
