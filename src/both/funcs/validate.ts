function validate<S extends Schema>(val: unknown, schema: S): asserts val is InferType<S> {
    schema.validateSync(val)
}
