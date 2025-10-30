import Ahooks from 'ahooks'
import DayJS from 'dayjs'
import MotionReact from 'motion/react'
import TwMerge from 'tailwind-merge'
import Valtio from 'valtio'

declare global {
    const ahooks: typeof Ahooks
    const valtio: typeof Valtio
    const twMerge: typeof TwMerge.twMerge
    const dayjs: typeof DayJS
    const motionReact: typeof MotionReact

    type Dayjs = DayJS.Dayjs
}
