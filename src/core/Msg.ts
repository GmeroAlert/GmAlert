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

export type Config = {
  timeout: number
} & MsgPropsFull

export type MsgCore = (props: PropsMessage) => MsgType

/**
 * 消息容器
 */
export class Msg {
  private conf: Config = { timeout: 2500 }

  private id = 0

  private insts: Map<number, OneMsg> = new Map()

  private core: (props: PropsMessage) => MsgType

  constructor(core: MsgCore, conf?: Partial<Config>) {
    this.conf = { ...this.conf, ...conf }
    this.core = core
  }

  config(config: Partial<Config>) {
    this.conf = { ...this.conf, ...config }
  }

  fire(conf: MsgPropsFull) {
    const oMsg = this.mkMsg(conf)

    this.sT(oMsg, conf?.timeout || this.conf.timeout)

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

  // 关闭多余消息, 打开新消息
  private mkMsg(conf: MsgPropsFull) {
    const id = this.id++
    const props = {
      ...this.conf,
      ...conf,
      content: conf.content || '',
      onClosed: (status: number) => {
        conf?.onClosed && conf.onClosed(status)
      },
      beforeClose: async (status: number) => {
        if (conf?.beforeClose) {
          const res = await conf.beforeClose(status)
          if (!res) return false
        }
        this.insts.delete(id)
        return true
      },
    }

    const inst = this.core(props)

    // 重定义open和close方法
    let opened = false
    const open = () => {
      if (opened) return
      opened = true
      inst.open()
    }

    // 设置样式
    if (props.className) {
      inst.$el.classList.add(...props.className)
    }
    if (props.style) {
      changeStyle(inst.$el, props.style)
    }

    // 关闭其他消息
    const nextInst = this.insts.values().next().value
    if (nextInst) {
      nextInst.progress?.pause()
      nextInst.close(-2)
    }

    const oMsg: OneMsg = { ...inst, open }
    this.insts.set(id, oMsg)
    open()

    return oMsg
  }
}

function getArgs(args: MsgPropsUser[]) {
  const result: MsgPropsFull = {
    content: 'success',
  }

  let firstStr = false
  const assignArg = (arg: string | object | number) => {
    switch (typeof arg) {
      case 'string':
        if (firstStr) {
          result.text = arg
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

export function MakeMsg(core: MsgCore, conf?: Partial<Config>) {
  const $msg = new Msg(core, conf)
  const res = (...args: (string | Partial<MsgPropsFull> | number)[]) => {
    return $msg.fire(getArgs(args))
  }

  res.config = $msg.config.bind($msg)

  return res
}
