import type { AlertMethod } from '../../component/alert'
import GmAlert from '../../component/alert'
import GmInfomation from '../../component/infomation/infomation'

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
      console.warn(`only one ${this.form} can be opened at the same time`)
      this.locked = true
      this.activeInst.close().then(() => {
        this.activeInst = undefined
        this.locked = false
      })
      return
    }
    const inst =
      this.form === 'alert'
        ? GmAlert({
            title,
            text,
            type,
            showClose: config?.showClose,
            onConfirm: config?.onConfirm,
            onCancel: config?.onCancel,
            onClosed: () => {
              this.activeInst = undefined
              this.locked = false
              if (config?.onClosed) {
                config.onClosed()
              }
            },
          })
        : GmInfomation({
            content: title,
            type,
            hideIn: config?.hideIn,
            onClosed: () => {
              this.activeInst = undefined
              if (config?.onClosed) {
                config.onClosed()
              }
            },
          })
    this.activeInst = inst
    inst.open().then(() => {
      this.locked = false
    })

    return inst
  }
}
