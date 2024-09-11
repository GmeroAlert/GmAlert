export const noop = () => {}
export const isServer = __IS_CLIENT__ ? false : typeof window === 'undefined'
/**
 * we already make sure that doc will nerver be called in server side
 * so we declare it as Document
 * check isServer() for prevent document is undefined error
 */
export const doc = (isServer ? undefined : window.document) as Document
