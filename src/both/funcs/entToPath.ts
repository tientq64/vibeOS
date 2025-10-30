function entToPath(ent: Ent | string): string {
    if (typeof ent !== 'string') {
        return ent.path
    }
    return ent
}
