import { animationendHandle, changeAnimation } from '../utils/animateHandle'
import { changeStyle, cn, getNoticeContainer, newDiv } from '../utils/html'
import { AnimatedIcon } from '../component/animatedIcons/animatedIcons'
import { MakeMsg } from '../core/Msg'
import type { MsgType, PropsMessage } from './message'

import '../styles/notice.scss'

export function GmNotice(props: PropsMessage): MsgType {
  const icon = AnimatedIcon(props.type, true, cn('notice-icon'))
  const $wrapper = newDiv(cn('notice'))

  $wrapper.innerHTML = `<div class="${cn('notice-main')}">${icon}\
  <div class="${cn('notice-content')}">${props.content}</div></div>`

  animationendHandle($wrapper, (animationName) => {
    if (animationName === cn('open')) {
      changeStyle($wrapper, [
        `opacity:1`,
        `animation-name:${cn('notice-movein')}`,
      ])
    }

    if (animationName === cn('notice-moveout')) {
      changeAnimation($wrapper, cn('close'))
    }
  })

  const open = () => {
    getNoticeContainer().prepend($wrapper)
    changeStyle($wrapper, [`max-height:${$wrapper.offsetHeight + 10}px`])
    changeAnimation($wrapper, cn('open'))
    setTimeout(() => {
      const $icon = $wrapper.querySelector<HTMLElement>(`.${cn('notice-icon')}`)
      if ($icon) {
        $icon.style.opacity = '1'
      }
    }, 400)
  }

  const close = (status: number) => {
    props.onClose()
    return new Promise<void>((resolve) => {
      changeAnimation($wrapper, cn('notice-moveout'))
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
