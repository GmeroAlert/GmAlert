import { Alert } from './modules/Alert'
import { Gmsg } from './modules/Gmsg'

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
const message = new Gmsg('msg')
const notice = new Gmsg('notice')

export { alert, message, notice, infomation }
