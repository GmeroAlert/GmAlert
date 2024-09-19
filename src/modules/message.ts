import msgCss from 'inline:../styles/message.scss'

import { MakeMsg } from '../core/Msg'
import { animationendHandle, changeAnimation } from '../utils/animateHandle'

import { cn, getContainer, injectStyle, newDiv } from '../utils/html'
import type { MsgPropsFull, PropsMessage } from './types'

export interface MsgType {
  open: () => void
  close: (status: number) => Promise<void>
  update: (conf: MsgPropsFull & { timeout?: number }) => void
  $el: HTMLElement
}

export function GmMessage(props: PropsMessage): MsgType {
  const localProps = { ...props }
  const $wrapper = newDiv(cn('msg'))
  const $main = newDiv(cn('msg-main'))
  $wrapper.append($main)
  const $icon = newDiv(cn('icon'))

  const inst: MsgType = {} as MsgType

  const update = (conf: Partial<PropsMessage>) => {
    const { content, icon = '', beforeClose, onClosed } = Object.assign(localProps, conf)
    $main.innerHTML = `<div class=${cn('msg-content')}>${content}</div>`
    $icon.innerHTML = icon
    if (icon) {
      $main.prepend($icon)
    }
    else {
      $icon.remove()
    }

    inst.open = () => {
      getContainer().append($wrapper)
      changeAnimation($wrapper, cn('alert-in'))
    }

    inst.close = async (status: number) => {
      await beforeClose(status)
      changeAnimation($wrapper, cn('alert-out'))

      return new Promise<void>((resolve) => {
        animationendHandle($wrapper, (e: string) => {
          if (e === cn('alert-out')) {
            $wrapper.remove()
            onClosed(status)
            resolve()
          }
        })
      })
    }
  }

  inst.update = update
  inst.$el = $wrapper
  update(props)

  return inst
}

export const message = MakeMsg(GmMessage, () => {
  injectStyle(msgCss)
})
