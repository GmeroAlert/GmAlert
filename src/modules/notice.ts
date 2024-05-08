import { animationendHandle, changeAnimation } from '../utils/animateHandle'
import { changeStyle, cn, getNoticeContainer, newDiv, querySelector } from '../utils/html'
import { AnimatedIcon } from '../component/animatedIcons/animatedIcons'
import { MakeMsg } from '../core/Msg'
import type { MsgType } from './message'
import type { PropsMessage } from './types'

export function GmNotice(props: PropsMessage): MsgType {
  const icon = AnimatedIcon(props.type, true, cn('notice-icon'))
  const $wrapper = newDiv(cn('notice'))

  $wrapper.innerHTML = `<div class="${cn(
    'notice-main',
  )}">${icon}<div class="${cn('notice-content')}">${props.content}</div></div>`

  const open = () => {
    getNoticeContainer().prepend($wrapper)
    changeStyle($wrapper, [`--mh:${$wrapper.offsetHeight + 10}px`])
    changeAnimation($wrapper, cn('open'))
    setTimeout(() => {
      const $icon = querySelector<HTMLElement>(`.${cn('notice-icon')}`,$wrapper)
      if ($icon) {
        changeStyle($icon, ['opacity:1'])
      }
    }, 300)
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

export const notice = MakeMsg(GmNotice, 0)
