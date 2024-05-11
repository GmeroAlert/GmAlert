import { animationendHandle, changeAnimation } from '../utils/animateHandle'
import { cn, getContainer, newDiv } from '../utils/html'
import { MakeMsg } from '../core/Msg'

import { SpinIcon } from '../component/icons'
import type { PropsMessage } from './types'

export interface MsgType {
  open: () => void
  close: (status: number) => Promise<void>
  $el: HTMLElement
}

export function GmMessage(props: PropsMessage): MsgType {
  const $wrapper = newDiv(cn('msg'))
  const $main = newDiv(cn('msg-main'))
  $main.innerHTML = `<div class=${cn('msg-content')}>${props.content}</div>`
  $wrapper.append($main)
  let icon = props.icon || ''

  if (icon === 'loading') {
    icon = SpinIcon()
  }

  const $icon = newDiv(cn('icon'))
  $icon.innerHTML = icon
  icon && $main.prepend($icon)

  const open = () => {
    getContainer().append($wrapper)
    changeAnimation($wrapper, cn('alert-in'))
  }

  const close = async (status: number) => {
    await props.beforeClose(status)
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
