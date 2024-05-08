export type MsgColor = 'success' | 'error' | 'warn' | 'info' | 'loading'

export interface PropsMessage {
  style?: string[]
  className?: string[]
  type: MsgColor
  content: string
  /**
   *
   * @param status 0: close by user cancel, 1: close by user confirm, -1: close by timeout, -2 or undefined : close unexpectedly
   * @returns
   */
  onClosed: (status: number) => void
  onClose: () => void
}

export interface PropsAlert extends PropsMessage {
  text?: string
  html?: string | HTMLElement
  hideClose?: boolean
  showConfirm?: boolean
  showCancel?: boolean
  hideMask?: boolean
}

export interface PropsInfo extends PropsMessage {
  title?: string
  headerLeft?: string
  headerRight?: string
  hideClose?: boolean
}

export interface MsgPropsFull {
  style?: string[]
  className?: string[]
  content: string
  type: MsgColor
  title?: string // only for info
  timeout?: number
  text?: string
  headerLeft?: string
  headerRight?: string
  hideClose?: boolean
  onClosed?: (status: number) => void
  showConfirm?: boolean
  showCancel?: boolean
  html?: string | HTMLElement
  hideMask?: boolean
}

export type MsgPropsUser = Partial<MsgPropsFull> | string | number
