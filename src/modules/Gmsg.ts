import { Msg } from './Msg/Msg'
import type { Setting, UserSetting } from './utils'
import { assignConfig, copyConfig, getDefaultConf } from './utils'

/**
 * 通过配置信息 来判断是否为同一条消息,并返回消息实例
 * @param {Setting} params 配置项
 * @private
 */
function judgeReMsg(this: Gmsg, params: Setting): Msg {
  let oMsg: Msg | undefined
  oMsg = undefined

  const buildNewMsg = () => {
    const newMsg = new Msg(this, params)
    this.instCount += 1
    newMsg.id = this.instCount
    this.oMsgs.set(this.instCount, {
      inst: newMsg,
      config: JSON.stringify(params),
    })

    const len = this.oMsgs.size
    const { maxNums } = this.setting
    /**
     * 关闭多余的消息
     */
    if (len > maxNums) {
      let noClosed = true
      this.oMsgs.forEach((v) => {
        const tmp = v.inst
        if (noClosed && tmp.id !== newMsg.id) {
          noClosed = false
          tmp.close()
        }
      })
    }
    return newMsg
  }

  this.oMsgs.forEach((v) => {
    const oMsgItem = v

    if (v.config === JSON.stringify(params)) {
      oMsg = oMsgItem.inst
      oMsg.count = oMsg.count >= 99 ? oMsg.count : oMsg.count + 1
      oMsg.setMsgCount()
    }
  })

  if (oMsg === undefined) {
    oMsg = buildNewMsg()
  }

  return oMsg
}

interface OMsg {
  inst: Msg
  config: string
}

// gmsg的容器类，存放实例以及配置信息。
export class Gmsg {
  version: string

  instCount: number

  oMsgs: Map<number, OMsg>

  // 存放当前容器的默认设置
  setting: Setting

  form: 'msg' | 'notice'

  constructor(form: 'msg' | 'notice') {
    this.version = __VERSION__
    this.instCount = 0
    this.oMsgs = new Map()
    this.setting = getDefaultConf()
    this.form = form
  }

  config(cfg: UserSetting) {
    this.setting = assignConfig(this.setting, cfg)
  }

  info(txt: string, config?: UserSetting) {
    const params = config
      ? assignConfig(this.setting, config)
      : copyConfig(this.setting)
    params.type = 'info'
    params.content = txt
    return judgeReMsg.call(this, params)
  }

  warning(txt: string, config?: UserSetting) {
    const params = config
      ? assignConfig(this.setting, config)
      : copyConfig(this.setting)
    params.type = 'warning'
    params.content = txt
    return judgeReMsg.call(this, params)
  }

  success(txt: string, config?: UserSetting) {
    const params = config
      ? assignConfig(this.setting, config)
      : copyConfig(this.setting)
    params.type = 'success'
    params.content = txt
    return judgeReMsg.call(this, params)
  }

  error(txt: string, config?: UserSetting) {
    const params = config
      ? assignConfig(this.setting, config)
      : copyConfig(this.setting)
    params.type = 'error'
    params.content = txt

    return judgeReMsg.call(this, params)
  }

  loading(txt: string, config?: UserSetting) {
    const params = config
      ? assignConfig(this.setting, config)
      : copyConfig(this.setting)
    params.type = 'loading'
    params.timeout = 0
    params.content = txt
    const inst = judgeReMsg.call(this, params)
    this.closeAll(inst.id)
    return inst
  }

  remove(id: number) {
    this.oMsgs.delete(id)
  }

  closeAll(...excepts: number[]) {
    const tmp = this.oMsgs.values()
    for (const element of tmp) {
      if (!excepts.includes(element.inst.id)) element.inst.close()
    }
  }
}
