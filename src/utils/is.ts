export const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined'
export function notNullish<T = any>(val?: T | null | undefined): val is T {
  return val != null
}
export function assert(condition: boolean, ...infos: any[]) {
  if (!condition)
    console.warn(...infos)
}
const toString = Object.prototype.toString
export function isObject(val: any): val is object {
  return toString.call(val) === '[object Object]'
}
export const now = () => Date.now()
export const timestamp = () => +Date.now()
export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}
export function noop() {}
export function rand(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
export function hasOwn<T extends object, K extends keyof T>(val: T, key: K): key is K {
  return Object.prototype.hasOwnProperty.call(val, key)
}

export const isIOS = /* #__PURE__ */ getIsIOS()

function getIsIOS() {
  return (
    /iP(?:ad|hone|od)/.test(window.navigator.userAgent)
    // The new iPad Pro Gen3 does not identify itself as iPad, but as Macintosh.
    // https://github.com/vueuse/vueuse/issues/3577
    || (window.navigator.maxTouchPoints > 2
      && /iPad|Macintosh/.test(window.navigator.userAgent))
  )
}
