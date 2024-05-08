import type { MsgType } from '../modules/message'
import { changeStyle, cn, newDiv, setMsgCount } from '../utils/html'

import type { MsgPropsFull, MsgPropsUser, PropsMessage } from '../modules/types'

export interface OneMsg extends Omit<MsgType, 'open'> {
  // 用于标识消息是否重复, 这是内容+类型字符串的组合
  // 一般只用于messsage和notice
  readonly id: string
  progress?: {
    pause: () => void
    resume: () => void
    remove: () => void
  }
  count: number
}

export interface Config {
  timeout: number
  maxCount: number
}

export type MsgCore = (props: PropsMessage) => MsgType

/**
 * 消息容器
 */
export class Msg {
  timeout = 2500

  maxCount = 8

  private activeInsts: Map<string, OneMsg> = new Map()

  // 0: 'due to maxCount' | 1:'msg only one'
  type: number

  private core: (props: PropsMessage) => MsgType

  constructor(core: MsgCore, type: number) {
    this.type = type
    this.core = core

    if (type === 1) {
      this.timeout = 0
    }
  }

  config(config: Partial<Config>) {
    this.timeout = config.timeout || this.timeout
    this.maxCount = config.maxCount || this.maxCount
  }

  fire(conf: MsgPropsFull) {
    const oMsg = this.mkMsg(conf)

    // 非loading类型才会设置定时
    if (conf.type !== 'loading') {
      this.sT(oMsg, conf?.timeout || this.timeout)
    }
    return oMsg
  }

  // 设置定时
  private sT(oMsg: OneMsg, timeout?: number) {
    if (!timeout) return
    const { $el } = oMsg
    const p = this.mkP(oMsg, timeout)
    p.resume()

    $el.onmouseenter = p.pause
    $el.onmouseleave = p.resume
  }

  // 设置进度
  private mkP(oMsg: OneMsg, timeout: number) {
    oMsg.progress?.remove()
    const { $el } = oMsg
    const $progress = newDiv(cn('progress'))
    const $progressBar = newDiv(cn('progress-bar'))
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

    const resume = () => {
      changeStyle($progressBar, [
        'width:0',
        `transition:width ${timeout * get()}ms linear`,
      ])
    }

    const remove = () => {
      $progress.remove()
    }

    return (oMsg.progress = { pause, resume, remove })
  }

  // 判断消息是否存在, 设置msgCount以及关闭多余消息
  private mkMsg(conf: MsgPropsFull) {
    const id = `${conf.content}${conf.type}`
    if (!this.type && this.activeInsts.has(id)) {
      const inst = this.activeInsts.get(id)!
      inst.count += 1
      setMsgCount(inst.$el, inst.count)
      return inst
    }

    const props = {
      ...conf,
      onClosed: (status: number) => {
        conf?.onClosed && conf.onClosed(status)
      },
      onClose: () => {
        this.activeInsts.delete(id)
      },
    }

    const inst = this.core(props)

    if (this.type === 1 || this.activeInsts.size >= this.maxCount) {
      const nextInst = this.activeInsts.values().next().value
      if (nextInst) {
        nextInst.progress?.pause()
        nextInst.close(-2)
      }
    }

    const oMsg: OneMsg = { ...inst, id, count: 1 }

    this.activeInsts.set(id, oMsg)

    inst.open()

    return oMsg
  }
}

function getArgs(args: MsgPropsUser[]) {
  const result: MsgPropsFull = {
    content: 'success',
    type: 'success',
  }

  let firstStr = false
  const assignArg = (arg: string | object | number) => {
    switch (typeof arg) {
      case 'string':
        if (firstStr) {
          result.type = arg as MsgPropsFull['type']
        } else {
          result.content = arg
          firstStr = true
        }
        break
      case 'number':
        result.timeout = arg
        break
      case 'object':
        Object.assign(result, arg)
        break
    }
  }

  for (let index = 0; index < 4; index++) {
    const element = args[index]
    element && assignArg(element)
  }

  return result
}

export function MakeMsg(core: MsgCore, type: number) {
  const $msg = new Msg(core, type)
  const res = (...args: (string | Partial<MsgPropsFull> | number)[]) => {
    return $msg.fire(getArgs(args))
  }

  res.config = $msg.config.bind($msg)

  return res
}
