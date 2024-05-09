export interface PropsMessage {
  style?: string[]
  className?: string[]
  timeout?: number
  icon?: string
  content: string
  /**
   *
   * @param status 0: close by user cancel, 1: close by user confirm, -1: close by timeout, -2 or undefined : close unexpectedly
   * @returns
   */
  onClosed: (status: number) => void
  beforeClose: (status: number) => boolean | Promise<boolean> // 关闭前触发，返回false则不关闭
}

export interface PropsNotice extends PropsMessage {
  bottom?: boolean
  background?: string // 背景色
  color?: string // 文字颜色
}

export interface PropsAlert extends PropsMessage {
  text?: string
  html?: string | HTMLElement
  confirmLabel?: string // 确认按钮文本
  cancelLabel?: string // 取消按钮文本
  beforeClose: (status: number) => boolean | Promise<boolean> // 关闭前触发，返回false则不关闭
}

export type MsgPropsFull = Partial<PropsMessage & PropsAlert & PropsNotice>

export type MsgPropsUser = Partial<MsgPropsFull> | string | number
