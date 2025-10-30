type Primitive = string | number | boolean | bigint | symbol | null | undefined

type Obj<T = unknown> = Record<string, T>

type MakePromiseReturn<F> = F extends (...args: infer A) => infer R
    ? (...args: A) => R extends Promise<any> ? R : Promise<R>
    : never

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type ReactNode = React.ReactNode
type ReactElement = React.ReactElement
type FunctionComponent = React.FunctionComponent

type SyntheticEvent<T = HTMLElement, E = Event> = React.SyntheticEvent<T, E>
type ReactPointerEvent<T = HTMLElement> = React.PointerEvent<T>

type ChangeEventHandler<T = HTMLInputElement> = React.ChangeEventHandler<T>
type FormEventHandler<T = HTMLFormElement> = React.FormEventHandler<T>
type MouseEventHandler<T = HTMLElement> = React.MouseEventHandler<T>
type PointerEventHandler<T = HTMLElement> = React.PointerEventHandler<T>
type WheelEventHandler<T = HTMLElement> = React.WheelEventHandler<T>
type KeyboardEventHandler<T = HTMLElement> = React.KeyboardEventHandler<T>
type FocusEventHandler<T = HTMLElement> = React.FocusEventHandler<T>

type HTMLAttributes<T = HTMLElement> = React.HTMLAttributes<T>
type ButtonHTMLAttributes<T = HTMLButtonElement> = React.ButtonHTMLAttributes<T>
type InputHTMLAttributes<T = HTMLInputElement> = React.InputHTMLAttributes<T>
type TextareaHTMLAttributes<T = HTMLTextAreaElement> = React.TextareaHTMLAttributes<T>
type FormHTMLAttributes<T = HTMLFormElement> = React.FormHTMLAttributes<T>

type CSSProperties = React.CSSProperties
