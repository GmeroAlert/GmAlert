import { animationendHandle, changeAnimation } from '../utils/animateHandle'
import { changeStyle, cn, getMessageContainer, newDiv } from '../utils/html'
import { SvgIcon } from '../component/svgicons'
import { MakeMsg } from '../core/Msg'

import type { PropsMessage } from './types'

export interface MsgType {
  open: () => void
  close: (status: number) => Promise<void>
  $el: HTMLElement
}

export function GmMessage(props: PropsMessage): MsgType {
  const icon = SvgIcon(props.type, cn('icon'))
  const $wrapper = newDiv(cn('msg'))
  if (props.className) {
    $wrapper.classList.add(...props.className)
  }
  if (props.style) {
    changeStyle($wrapper, props.style)
  }
  const $main = newDiv(cn('msg-main'))
  $wrapper.append($main)
  $main.innerHTML = `${icon}<div class=${cn('msg-content')}>${
    props.content
  }</div>`

  const open = () => {
    getMessageContainer().append($wrapper)
    changeAnimation($wrapper, cn('alert-in'))
  }

  const close = (status: number) => {
    props.onClose()
    changeStyle($main, [`max-height: ${$main.offsetHeight}px`])
    changeAnimation($wrapper, cn('msg-out'))
    changeAnimation($main, cn('msg-close'))

    return new Promise<void>((resolve) => {
      animationendHandle($wrapper, (e: string) => {
        if (e === cn('msg-out')) {
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

export const message = MakeMsg(GmMessage, 0)
