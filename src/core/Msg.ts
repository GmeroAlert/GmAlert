import main from 'inline:../styles/main.scss'
import { isServer, noop } from '../utils/helper'
import { changeStyle, cn, injectStyle, newDiv } from '../utils/html'

import type { MsgType } from '../modules/message'
import type { MsgPropsFull, MsgPropsUser, PropsMessage } from '../modules/types'

injectStyle(main)

export interface OneMsg extends Omit<MsgType, 'open'> {
  progress?: {
    pause: () => void
    resume: () => void
    remove: () => void
  }
}

export type MsgCore = (props: PropsMessage) => MsgType

/**
 * 消息容器
 */
export class Msg {
  private conf: MsgPropsFull = { timeout: 2500 }

  private id = 0

  private insts: Map<number, OneMsg> = new Map()

  private core: (props: PropsMessage) => MsgType

  constructor(core: MsgCore, conf?: MsgPropsFull) {
    this.conf = { ...this.conf, ...conf }
    this.core = core
  }

  config(config: MsgPropsFull) {
    this.conf = { ...this.conf, ...config }
  }

  fire(conf: MsgPropsFull) {
    const oMsg = this.mkMsg(conf)

    this.sT(oMsg, conf?.timeout)

    return oMsg
  }

  // 设置定时
  private sT(oMsg: OneMsg, timeout?: number) {
    oMsg.progress?.remove()
    if (timeout === 0)
      return
    timeout = timeout || this.conf.timeout!
    const { $el } = oMsg
    const p = this.mkP(oMsg, timeout)
    p.resume()

    $el.onmouseenter = p.pause
    $el.onmouseleave = p.resume
  }

  // 设置进度
  private mkP(oMsg: OneMsg, timeout: number) {
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
          if (!res)
            return false
        }
        this.insts.delete(id)
        return true
      },
    }

    const inst = this.core(props)

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

    // update rebind
    const update = (conf: MsgPropsFull) => {
      inst.update(conf)
      if (conf.timeout !== undefined) {
        this.sT(inst, conf.timeout)
      }
    }

    const oMsg: OneMsg = { ...inst, ...{ open: noop, update } }
    this.insts.set(id, oMsg)
    inst.open()

    return oMsg
  }
}

function getArgs(args: MsgPropsUser[]) {
  const result: MsgPropsFull = {}

  let firstStr = false
  const assignArg = (arg?: string | object | number) => {
    switch (typeof arg) {
      case 'string':
        if (firstStr) {
          result.text = arg
        }
        else {
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
    assignArg(element)
  }

  return result
}

export function MakeMsg(
  core: MsgCore,
  callback: () => void,
  conf?: MsgPropsFull,
): {
    (...args: MsgPropsUser[]): OneMsg
    config: (config: MsgPropsFull) => void
  } {
  // SSR
  if (isServer) {
    const empty = () => ({ close: noop, open: noop, update: noop })
    empty.config = noop
    return empty as any
  }

  callback()
  const $msg = new Msg(core, conf)
  const res = (...args: MsgPropsUser[]) => {
    return $msg.fire(getArgs(args))
  }

  res.config = $msg.config.bind($msg)

  return res
}
