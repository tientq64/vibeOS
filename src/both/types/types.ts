export type Primitive = string | number | boolean | bigint | symbol | null | undefined

export type Obj<T = unknown> = Record<string, T>

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type MakePromiseReturn<F> = F extends (...args: infer A) => infer R
    ? (...args: A) => R extends Promise<any> ? R : Promise<R>
    : never
