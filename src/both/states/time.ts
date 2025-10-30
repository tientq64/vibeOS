interface Time {
    unixTime: number
}

const time = proxy({
    unixTime: Date.now()
})
