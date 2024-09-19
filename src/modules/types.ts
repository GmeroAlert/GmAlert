export interface PropsMessage {
  style?: string[]
  className?: string[]
  timeout?: number
  icon?: string
  content: string
  /**
   *
   * @param status 0: close by user cancel, 1: close by user confirm, -1: close by timeout, -2 or undefined : close unexpectedly,-3: overlay click
   * @returns
   */
  onClosed: (status: number) => void
  // 关闭前触发，返回false则不关闭 (-2除外, 不能关闭只对 alert 有效)
  beforeClose: (status: number) => boolean | Promise<boolean>
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
}

export type MsgPropsFull = Partial<PropsMessage & PropsAlert & PropsNotice>

export type MsgPropsUser = MsgPropsFull | string | number
