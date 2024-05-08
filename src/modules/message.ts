import { animationendHandle, changeAnimation } from '../utils/animateHandle'
import { cn, getContainer, newDiv } from '../utils/html'
import { MakeMsg } from '../core/Msg'

import type { PropsMessage } from './types'

export interface MsgType {
  open: () => void
  close: (status: number) => Promise<void>
  $el: HTMLElement
}

export function GmMessage(props: PropsMessage): MsgType {
  const $wrapper = newDiv(cn('msg'))
  const $main = newDiv(cn('msg-main'))
  $wrapper.append($main)
  $main.innerHTML = `<div class=${cn('msg-content')}>${props.content}</div>`

  const open = () => {
    getContainer().append($wrapper)
    changeAnimation($wrapper, cn('alert-in'))
  }

  const close = (status: number) => {
    props.onClose()
    changeAnimation($wrapper, cn('alert-out'))

    return new Promise<void>((resolve) => {
      animationendHandle($wrapper, (e: string) => {
        if (e === cn('alert-out')) {
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

export const message = MakeMsg(GmMessage)
