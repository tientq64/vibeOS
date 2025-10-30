function UIShowcase() {
    function App(): ReactNode {
        const readDir = useRequest(async () => {
            return await ts.readDir('/C')
        })

        return (
            <div className="p-1 *:m-1">
                <Button>Test</Button>
                <Button fill>Fill...</Button>
                <TextInput />
                <TextInput placeholder="Nhập tìm kiếm..." rightElement={<Button icon="search" />} />
                <TextInput fill />
                <div>
                    {readDir.data?.map((ent) => (
                        <div className="row justify-start">
                            <Icon name={ent.icon} />
                            {ent.path}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    return App
}
