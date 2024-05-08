import type { MsgType } from '../modules/message'
import { changeStyle, cn, newDiv } from '../utils/html'

import type { MsgPropsFull, MsgPropsUser, PropsMessage } from '../modules/types'

export interface OneMsg extends Omit<MsgType, 'open'> {
  progress?: {
    pause: () => void
    resume: () => void
    remove: () => void
  }
  open: () => void
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
  timeout: number

  private activeInsts: Map<string, OneMsg> = new Map()

  private core: (props: PropsMessage) => MsgType

  constructor(core: MsgCore, timeout = 2500) {
    this.timeout = timeout
    this.core = core
  }

  config(config: Partial<Config>) {
    this.timeout = config.timeout || this.timeout
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
        'width:100%',
        `transition:width ${timeout * (1 - get())}ms linear`,
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

    let opened = false

    const open = () => {
      if (opened) return
      opened = true
      inst.open()
    }

    const close = (status: number) => {
      if (!opened) return Promise.resolve()
      opened = false
      return inst.close(status)
    }

    if (props.className) {
      inst.$el.classList.add(...props.className)
    }

    if (props.style) {
      changeStyle(inst.$el, props.style)
    }

    // 如果消息数量超过最大值, 则关闭最早的消息
    const nextInst = this.activeInsts.values().next().value
    if (nextInst) {
      nextInst.progress?.pause()
      nextInst.close(-2)
    }

    const oMsg: OneMsg = { ...inst, close, open }

    this.activeInsts.set(id, oMsg)

    open()

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

export function MakeMsg(core: MsgCore, timeout?: number) {
  const $msg = new Msg(core, timeout)
  const res = (...args: (string | Partial<MsgPropsFull> | number)[]) => {
    return $msg.fire(getArgs(args))
  }

  res.config = $msg.config.bind($msg)

  return res
}
