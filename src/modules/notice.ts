import { animationendHandle, changeAnimation } from '../utils/animateHandle'
import { changeStyle, cn, getContainer, newDiv } from '../utils/html'
import { MakeMsg } from '../core/Msg'
import type { MsgType } from './message'
import type { PropsNotice } from './types'

export function GmNotice(props: PropsNotice): MsgType {
  const $wrapper = newDiv(cn('notice'))

  changeStyle($wrapper, [
    props.bottom ? 'bottom:0' : 'top:0',
    props.bottom ? '--y:100%' : '--y:-100%',
    props.background ? `background:${props.background}` : '',
    props.color ? `color:${props.color}` : '',
  ])

  $wrapper.innerHTML = `<div class="${cn('notice-main')}"><div class="${cn(
    'notice-content',
  )}">${props.content}</div></div>`

  const open = () => {
    getContainer().append($wrapper)
    changeAnimation($wrapper, cn('open'))
  }

  const close = async (status: number) => {
    const ifColose = await props.beforeClose(status)
    if (!ifColose) return
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
