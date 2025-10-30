function parseYaml(str: string): unknown {
    return jsyaml.load(str)
}
