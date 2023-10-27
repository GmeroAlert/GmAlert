import GmAlert from '../../component/alert'
import GmInformation from '../../component/information/Information'
import type { MsgType } from '../../component/message'
import GmMessage from '../../component/message'
import GmNotice from '../../component/notice'
import { changeStyle, newDiv, setMsgCount } from '../../utils/html'
import styles from '../../main.module.scss'

export interface OneMsg extends Omit<MsgType, 'open'> {
  // 用于标识消息是否重复, 这是内容+类型字符串的组合
  // 一般只用于messsage和notice
  readonly identifer: string
  progress?: {
    pause: () => void
    resume: () => void
    reset: () => void
    get: () => number
  }
  count: number
}

export interface Config {
  timeout: number
  maxCount: number
}

export interface MsgPropsExt {
  timeout?: number
  text?: string
  headerLeft?: string
  headerRight?: string
  showClose?: boolean
  onClosed?: (status: number) => void
  showConfirm?: boolean
  showCancel?: boolean
}

/**
 * 消息容器
 */
export class Msg {
  timeout = 2500

  maxCount = 8

  private activeInsts: Map<string, OneMsg> = new Map()

  // 0:'msg' | 1:'notice' | 2:'alert' | 3:'information'
  form: number

  constructor(form: number) {
    this.form = form

    if (form > 1) {
      this.timeout = 0
    }
  }

  config(config: Partial<Config>) {
    this.timeout = config.timeout || this.timeout
    this.maxCount = config.maxCount || this.maxCount
  }

  fire(
    text: string,
    type?: 'success' | 'error' | 'warning' | 'info' | 'loading',
    conf?: MsgPropsExt,
  ) {
    const oMsg = this.mkMsg(text, type || 'success', conf)
    if (type !== 'loading') {
      this.sT(oMsg, conf?.timeout || this.timeout)
    }

    return oMsg
  }

  // 设置定时
  private sT(oMsg: OneMsg, timeout?: number) {
    if (!timeout) return
    const { $el } = oMsg
    let p = oMsg.progress!
    p ??= this.mkP(oMsg, timeout)
    p.reset()

    $el.onmouseenter = p.pause
    $el.onmouseleave = p.resume
  }

  // 设置进度
  private mkP(oMsg: OneMsg, timeout: number) {
    const { $el } = oMsg
    const $progress = newDiv(styles['gmsg-progress'])
    const $progressBar = newDiv(styles['gmsg-progress-bar'])
    $progress.append($progressBar)
    $el.append($progress)

    $progressBar.ontransitionend = () => {
      oMsg.close(-1)
    }

    const get = () => {
      return $progressBar.clientWidth / $progress.clientWidth
    }

    const pause = () => {
      changeStyle($progressBar, ['transition:none', `width:${get() * 100}%`])
    }

    // eslint-disable-next-line require-await
    const resume = async () => {
      changeStyle($progressBar, [
        'width:0',
        `transition:width ${timeout * get()}ms linear`,
      ])
    }

    const reset = () => {
      changeStyle($progressBar, ['width:100%', 'transition:none'])
      resume()
    }

    return (oMsg.progress = { pause, resume, reset, get })
  }

  // 判断消息是否存在, 设置msgCount以及关闭多余消息
  private mkMsg(
    content: string,
    type: 'success' | 'error' | 'warning' | 'info' | 'loading',
    conf?: MsgPropsExt,
  ) {
    const id = `${content}${type}`
    if (this.form < 2 && this.activeInsts.has(id)) {
      const inst = this.activeInsts.get(id)!
      inst.count += 1
      setMsgCount(inst.$el, inst.count)
      return inst
    }

    const props = {
      ...conf,
      content,
      type,
      onClosed: (status: number) => {
        this.form < 2 && this.activeInsts.delete(id)
        conf?.onClosed && conf.onClosed(status)
      },
    }
    let inst: MsgType

    switch (this.form) {
      case 0:
        inst = GmMessage(props)
        break
      case 1:
        inst = GmNotice(props)
        break
      case 2:
        inst = GmAlert(props)
        break
      case 3:
        inst = GmInformation(props)
        break
      default:
        inst = GmMessage(props)
        break
    }

    if (this.form < 2) {
      this.activeInsts.size >= this.maxCount &&
        this.activeInsts.values().next().value.close(-2)
    } else {
      // 关闭所有消息
      this.activeInsts.values().next().value?.close(-2)
      this.activeInsts.clear()
    }
    const oMsg: OneMsg = { ...inst, identifer: id, count: 1 }

    this.activeInsts.set(id, oMsg)
    inst.open()

    return oMsg
  }
}
