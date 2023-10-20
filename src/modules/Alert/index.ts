import type { AlertMethod } from '../../component/alert'
import GmAlert from '../../component/alert'
import GmInfomation from '../../component/infomation/Infomation'

export class Alert {
  private activeInst?: AlertMethod
  private locked = false
  private form: 'alert' | 'infomation'
  constructor(form: 'alert' | 'infomation' = 'alert') {
    this.form = form
  }

  fire(
    title: string,
    text?: string,
    type?: 'success' | 'error' | 'warning' | 'info' | 'loading',
    config?: {
      hideIn?: number
      showClose?: boolean
      onConfirm?: () => void
      onCancel?: () => void
      onClosed?: () => void
    },
  ) {
    if (this.locked) {
      return
    }
    this.locked = true
    if (this.activeInst) {
      if (this.form === 'alert') {
        console.warn(
          `you fire a alert when last one is not closed. That's maybe unsafe.`,
        )
      }
      this.activeInst.close()
      this.activeInst = undefined
    }
    const inst = this.createInst(title, text, type, config)
    this.activeInst = inst
    inst.open().then(() => {
      this.locked = false
    })
    return inst
  }

  private createInst(
    title: string,
    text?: string,
    type?: 'success' | 'error' | 'warning' | 'info' | 'loading',
    config?: {
      hideIn?: number
      showClose?: boolean
      onConfirm?: () => void
      onCancel?: () => void
      onClosed?: () => void
    },
  ) {
    const inst =
      this.form === 'alert'
        ? GmAlert({
            title,
            content: text,
            type: type || 'success',
            showClose: config?.showClose,
            onConfirm: config?.onConfirm,
            onCancel: config?.onCancel,
            onClosed: () => {
              if (config?.onClosed) {
                config.onClosed()
              }
            },
          })
        : GmInfomation({
            content: title,
            title: text,
            type: type || 'success',
            hideIn: config?.hideIn,
            onClosed: () => {
              if (config?.onClosed) {
                config.onClosed()
              }
            },
          })
    return inst
  }
}
