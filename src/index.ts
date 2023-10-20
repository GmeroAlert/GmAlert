import { Alert } from './modules/Alert'
import { Msg } from './modules/Msg/Msg'

const $alert = new Alert()
const alert = (
  title: string,
  text?: string,
  type?: 'success' | 'error' | 'warning' | 'info' | 'loading',
  config?: {
    showClose?: boolean
    onConfirm?: () => void
    onCancel?: () => void
    onClosed?: () => void
  },
) => {
  return $alert.fire(title, text, type, config)
}

const $infomation = new Alert('infomation')
const infomation = (
  content: string,
  title?: string,
  type?: 'success' | 'error' | 'warning' | 'info' | 'loading',
  config?: {
    hideIn?: number
    onClosed?: () => void
  },
) => {
  return $infomation.fire(content, title, type, config)
}
const $message = new Msg('msg')
const message = (
  content: string,
  type?: 'success' | 'error' | 'warning' | 'info' | 'loading',
  timeout?: number,
) => {
  return $message.fire(content, type, timeout)
}
message.config = $message.config.bind($message)

const $notice = new Msg('notice')
const notice = (
  content: string,
  type?: 'success' | 'error' | 'warning' | 'info' | 'loading',
  timeout?: number,
) => {
  return $notice.fire(content, type, timeout)
}
notice.config = $notice.config.bind($notice)

export { alert, message, notice, infomation }
