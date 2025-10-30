function TaskbarTrays(): ReactNode {
    const {
        time: { unixTime }
    } = useOS()

    return (
        <div className="row">
            <div>{formatTime(unixTime, 'HH:mm, DD-MM-YYYY')}</div>
        </div>
    )
}
