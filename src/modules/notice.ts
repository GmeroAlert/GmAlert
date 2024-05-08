import { animationendHandle, changeAnimation } from '../utils/animateHandle'
import { changeStyle, cn, getContainer, newDiv, varName } from '../utils/html'
import { MakeMsg } from '../core/Msg'
import type { MsgType } from './message'
import type { PropsMessage } from './types'

export function GmNotice(props: PropsMessage): MsgType {
  const $wrapper = newDiv(cn('notice'))

  changeStyle($wrapper, [`background:${varName(props.type)}`])

  $wrapper.innerHTML = `<div class="${cn('notice-main')}"><div class="${cn(
    'notice-content',
  )}">${props.content}</div></div>`

  const open = () => {
    getContainer().append($wrapper)
    changeAnimation($wrapper, cn('open'))
  }

  const close = (status: number) => {
    props.onClose()
    changeAnimation($wrapper, cn('close'))
    return new Promise<void>((resolve) => {
      animationendHandle($wrapper, (animationName) => {
        if (animationName === cn('close')) {
          $wrapper.remove()
          props.onClosed(status)
          resolve()
        }
      })
    })
  }

  return {
    open,
    close,
    $el: $wrapper,
  }
}

export const notice = MakeMsg(GmNotice)
