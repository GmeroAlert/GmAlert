import type { MsgType } from '../../component/message'
import GmMessage from '../../component/message'
import GmNotice from '../../component/notice'
import { getProgress, setMsgCount, setProgress } from '../../utils/html'

interface OneMsg extends MsgType {
  readonly identifer: string
  timer?: NodeJS.Timeout
  count: number
}

interface Config {
  timeout: number
  maxCount: number
}

/**
 * 消息容器
 */
export class Msg {
  timeout = 2500

  maxCount = 8

  private activeInsts: Map<string, OneMsg> = new Map()

  form: 'msg' | 'notice' | 'alert' | 'information'

  constructor(form: 'msg' | 'notice') {
    this.form = form
  }

  config(config: Partial<Config>) {
    this.timeout = config.timeout || this.timeout
    this.maxCount = config.maxCount || this.maxCount
  }

  fire(
    content: string,
    type?: 'success' | 'error' | 'warning' | 'info' | 'loading',
    timeout?: number,
  ) {
    const inst = this.judgeReMsg(content, type || 'success')
    if (type !== 'loading') {
      this.setTimeOut(inst, timeout || this.timeout)
    }

    return inst
  }

  // 设置定时
  private setTimeOut(oMsg: OneMsg, timeout?: number) {
    if (!timeout) return
    const $el = oMsg.$el

    setProgress($el, 1, timeout)

    oMsg.timer && clearInterval(oMsg.timer)
    oMsg.timer = setInterval(() => {
      if (getProgress($el) === 0) {
        oMsg.close()
        clearInterval(oMsg.timer)
      }
    }, 150)

    $el.addEventListener('mouseenter', () => {
      setProgress($el, getProgress($el), timeout, true)
    })

    $el.addEventListener('mouseleave', () => {
      setProgress($el, getProgress($el), timeout)
    })
  }

  // 判断消息是否存在, 设置msgCount以及关闭多余消息
  private judgeReMsg(
    content: string,
    type: 'success' | 'error' | 'warning' | 'info' | 'loading',
  ) {
    const id = `${content}${type}`
    for (const inst of this.activeInsts) {
      if (inst[1].identifer === id) {
        inst[1].count += 1
        setMsgCount(inst[1].$el, inst[1].count)
        return inst[1]
      }
    }
    const props = {
      content,
      type,
      onClosed: () => {
        this.activeInsts.delete(id)
      },
    }

    const inst = this.form === 'msg' ? GmMessage(props) : GmNotice(props)

    if (this.activeInsts.size >= this.maxCount) {
      this.activeInsts.values().next().value.close()
    }
    const oMsg = { ...inst, identifer: id, count: 1 }

    this.activeInsts.set(id, oMsg)
    oMsg.open()

    return oMsg
  }
}
