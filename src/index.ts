import type { MsgPropsFull } from './modules/Msg/Msg'
import { Msg } from './modules/Msg/Msg'

import './styles/global.scss'

function getArgs(args: (string | object)[]) {
  const result: MsgPropsFull = {
    content: 'success',
    type: 'success',
  }

  let firstStr = false
  const assignArg = (arg: string | object) => {
    switch (typeof arg) {
      case 'string':
        if (firstStr) {
          result.type = arg as MsgPropsFull['type']
        } else {
          result.content = arg
          firstStr = true
        }
        break
      case 'object':
        Object.assign(result, arg)
        break
    }
  }

  for (let index = 0; index < 3; index++) {
    const element = args[index]
    element && assignArg(element)
  }

  return result
}

function MakeMsg(form: number) {
  const $msg = new Msg(form)
  const res = (...args: string[]) => {
    return $msg.fire(getArgs(args))
  }

  res.config = $msg.config.bind($msg)

  return res
}

const alert = MakeMsg(2)

const information = MakeMsg(3)

const message = MakeMsg(0)

const notice = MakeMsg(1)

const GmAlert = { alert, message, notice, information }

export default GmAlert
