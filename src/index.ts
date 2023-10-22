import type { MsgPropsExt } from './modules/Msg/Msg'
import { Msg } from './modules/Msg/Msg'

import './styles/global.scss'

function MakeMsg(form: number) {
  const $msg = new Msg(form)
  const res = (
    content: string,
    type?: 'success' | 'error' | 'warning' | 'info' | 'loading',
    conf?: MsgPropsExt,
  ) => {
    return $msg.fire(content, type, conf)
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
