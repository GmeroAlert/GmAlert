import { animationendHandle, changeAnimation } from '../utils/animateHandle'
import { cn, getContainer, newDiv } from '../utils/html'
import { MakeMsg } from '../core/Msg'
import { CloseIcon } from '../component/icons/close'
import type { MsgType, PropsMessage } from './message'

import '../styles/information.scss'

interface PropsInfo extends PropsMessage {
  headerLeft?: string
  headerRight?: string
  hideClose?: boolean
}

export function GmInformation(props: PropsInfo): MsgType {
  const ColorMap: Record<string, string> = {
    info: '#409eff',
    success: '#67c23a',
    warn: '#e6a23c',
    error: '#f56c6c',
    loading: '#1890ff',
  }
  const color = ColorMap[props.type] || ColorMap.info
  const $wrapper = newDiv(cn('info'))
  $wrapper.innerHTML =
    `<div class="${cn('info-header')}"><div class="${cn(
      'info-status',
    )}" style="background:${color};"></div><span style="margin-right:auto;font-weight:600">${
      props.headerLeft || '公告'
    }</span><span style="font-size:.875em;opacity:.7">${
      props.headerRight || ''
    }</span>${props.hideClose ? '' : CloseIcon(cn('info-close'))}</div>` +
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
    const $close = $wrapper.querySelector<HTMLElement>(`.${cn('info-close')}`)!
    $close.onclick = () => {
      close(0)
    }
  }

  return { open, close, $el: $wrapper }
}

export const information = MakeMsg(GmInformation, 1)
