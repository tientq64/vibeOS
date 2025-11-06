import { args } from '@task/states/args'
import { object, ObjectShape } from 'yup'

export async function getArgs<S extends ObjectShape>(shape: S) {
    return object(shape).validate(args)
}
