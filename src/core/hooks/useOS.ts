function useOS(sync?: boolean) {
    return useSnapshot(os, { sync })
}
