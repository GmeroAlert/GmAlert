import { animationendHandle, changeAnimation } from '../utils/animateHandle'
import { changeStyle, cn, getContainer, newDiv } from '../utils/html'
import { MakeMsg } from '../core/Msg'
import { CloseIcon } from '../component/icons/close'
import type { MsgType } from './message'
import type { PropsInfo } from './types'

export function GmInformation(props: PropsInfo): MsgType {
  const color = `var(--gmal-${props.type})`
  const $wrapper = newDiv(cn('info'))
  if (props.className) {
    $wrapper.classList.add(...props.className)
  }
  if (props.style) {
    changeStyle($wrapper, props.style)
  }
  $wrapper.innerHTML =
    `<div class="${cn('info-header')}"><div class="${cn('info-title')} ${
      props.type === 'loading' ? cn('load') : ''
    }" style="background:${color}">${
      props.title || ''
    }</div><span style="margin-right:auto">${
      props.headerLeft || ''
    }</span><span style="opacity:.7">${props.headerRight || ''}</span></div>` +
    `<div class="${cn('info-content')}">${props.content}</div>`

  const open = () => {
    getContainer().append($wrapper)
  }

  const close = (status: number) => {
    props.onClose()
    return new Promise<void>((resolve) => {
      changeAnimation($wrapper, cn('info-out'))

      animationendHandle($wrapper, (e: string) => {
        if (e === cn('info-out')) {
          $wrapper.remove()
          props.onClosed(status)
          resolve()
        }
      })
    })
  }

  if (!props.hideClose) {
    const $head = $wrapper.querySelector<HTMLElement>(`.${cn('info-header')}`)!
    const $close = CloseIcon()
    $close.onclick = () => {
      close(0)
    }
    $head.append($close)
  }

  return { open, close, $el: $wrapper }
}

export const information = MakeMsg(GmInformation, 1)
