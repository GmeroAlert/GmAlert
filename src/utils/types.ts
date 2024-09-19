export type Fn<T = void> = () => T
export type AsyncFn<T = void> = () => Promise<T>
export type AnyFn = (...args: any[]) => any
export type Arrayable<T> = T[] | T
