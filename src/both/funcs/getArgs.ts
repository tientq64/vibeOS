function getArgs<S extends ObjectShape>(this: MaybeTask, shape: S) {
    const task = this ?? os

    return yup.object(shape).validateSync(task.args)
}
