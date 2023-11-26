import { animationendHandle, changeAnimation } from '../utils/animateHandle'
import { cn, getRoot, newDiv } from '../utils/html'
import { SvgIcon } from '../component/svgicons'
import { MakeMsg } from '../core/Msg'

import '../styles/message.scss'
import type { MsgColor } from './types'

export interface MsgType {
  open: () => void
  close: (status: number) => Promise<void>
  $el: HTMLElement
}

export interface PropsMessage {
  type: MsgColor
  content: string
  /**
   *
   * @param status 0: close by user cancel, 1: close by user confirm, -1: close by timeout, -2 or undefined : close unexpectedly
   * @returns
   */
  onClosed: (status: number) => void
}

export function GmMessage(props: PropsMessage): MsgType {
  const icon = SvgIcon(props.type, cn('icon'))
  const $wrapper = newDiv(cn('msg'))
  const $main = newDiv(cn('msg-main'))
  $wrapper.append($main)
  $main.innerHTML = `${icon}<div class=${cn('msg-content')}>${
    props.content
  }</div>`

  const open = () => {
    getRoot(0).append($wrapper)
    changeAnimation($wrapper, cn('msg-movein'))
  }

  const close = (status: number) => {
    $main.style.maxHeight = `${$main.offsetHeight}px`
    changeAnimation($wrapper, cn('msg-moveout'))
    changeAnimation($main, cn('msg-out'))

    return new Promise<void>((resolve) => {
      animationendHandle($wrapper, (e: string) => {
        if (e === cn('msg-moveout')) {
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
