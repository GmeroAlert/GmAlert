import { animationendHandle, changeAnimation } from '../utils/animateHandle'
import { cn, getRoot, newDiv } from '../utils/html'
import { AnimatedIcon } from '../component/animatedIcons/animatedIcons'
import { MakeMsg } from '../core/Msg'
import { CloseIcon } from '../component/icons/close'
import type { MsgType, PropsMessage } from './message'

import '../styles/alert.scss'

interface PropsAlert extends PropsMessage {
  text?: string
  hideClose?: boolean
  showConfirm?: boolean
  showCancel?: boolean
}

function Button(text: string, onClick: () => void) {
  const $btn = document.createElement('button')
  $btn.textContent = text
  $btn.onclick = onClick
  $btn.classList.add(cn('alert-btn'))

  return $btn
}

export function GmAlert(props: PropsAlert): MsgType {
  const $wrapper = newDiv(cn('alert'))
  const icon = AnimatedIcon(props.type, false, cn('alert-icon'))

  $wrapper.innerHTML = `${icon}<div class="${cn('alert-title')}">${
    props.content
  }</div>`

  if (props.text) {
    const $text = newDiv(cn('alert-content'))
    $text.textContent = props.text
    $wrapper.append($text)
  }

  const $root = getRoot(2)

  const open = () => {
    $root.append($wrapper)
  }

  const close = (status: number) => {
    changeAnimation($wrapper, cn('alert-hide'))
    return new Promise<void>((resolve) => {
      animationendHandle($wrapper, (e: string) => {
        if (e === cn('alert-hide')) {
          $wrapper.remove()
          props.onClosed(status)
          resolve()
        }
      })
    })
  }

  if (props.showCancel || props.showConfirm) {
    const $buttons = newDiv(cn('alert-btn-group'))
    props.showCancel &&
      $buttons.append(
        Button('取消', () => {
          close(0)
        }),
      )
    props.showConfirm &&
      $buttons.append(
        Button('确定', () => {
          close(1)
        }),
      )
    $wrapper.append($buttons)
  }

  if (!props.hideClose) {
    const $close = newDiv()
    $close.innerHTML = CloseIcon(cn('alert-close'))

    $close.onclick = () => {
      close(0)
    }

    $wrapper.append($close)
  }

  return { close, open, $el: $wrapper }
}

export const alert = MakeMsg(GmAlert, 1)
