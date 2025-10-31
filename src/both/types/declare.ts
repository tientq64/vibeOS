import Ahooks from 'ahooks'
import DayJS from 'dayjs'
import MotionReact from 'motion/react'
import TwMerge from 'tailwind-merge'
import Valtio from 'valtio'
import Yup from 'yup'

declare global {
    const ahooks: typeof Ahooks
    const valtio: typeof Valtio
    const twMerge: typeof TwMerge.twMerge
    const dayjs: typeof DayJS
    const yup: typeof Yup
    const motionReact: typeof MotionReact

    type Dayjs = DayJS.Dayjs
    type InferType<T extends AnySchema> = Yup.InferType<T>
    type AnySchema = Yup.AnySchema
    type Schema = Yup.Schema
    type ObjectShape = Yup.ObjectShape
    // type DateSchema = Yup.DateSchema
    // type MixedSchema = Yup.MixedSchema
    // type StringSchema = Yup.StringSchema
    // type TupleSchema = Yup.TupleSchema
    // type NumberSchema = Yup.NumberSchema
    // type BooleanSchema = Yup.BooleanSchema
    // type AnyObjectSchema = Yup.AnyObjectSchema
}
