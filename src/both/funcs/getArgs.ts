async function getArgs<S extends ObjectShape>(this: MaybeTask, shape: S) {
    const task = this ?? os

    return yup.object(shape).validate(task.args)
}
