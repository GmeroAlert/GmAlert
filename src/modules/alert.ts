import { animationendHandle, changeAnimation } from '../utils/animateHandle'
import { bodyScroll, cn, getContainer, newDiv } from '../utils/html'
import { AnimatedIcon } from '../component/animatedIcons/animatedIcons'
import { MakeMsg } from '../core/Msg'
import { CloseIcon } from '../component/icons/close'
import type { MsgType, PropsMessage } from './message'

interface PropsAlert extends PropsMessage {
  text?: string
  html?: string | HTMLElement
  hideClose?: boolean
  showConfirm?: boolean
  showCancel?: boolean
  hideMask?: boolean
}

function Button(text: string, onClick: () => void) {
  const $btn = document.createElement('button')
  $btn.textContent = text
  $btn.onclick = onClick
  $btn.classList.add(cn('alert-btn'))

  return $btn
}

export function GmAlert(props: PropsAlert): MsgType {
  const $box = newDiv(cn('alert-box'))
  const $wrapper = newDiv(cn('alert'))
  const icon = AnimatedIcon(props.type, false, cn('alert-icon'))

  $box.append($wrapper)

  $wrapper.innerHTML = `${icon}<div class="${cn('alert-title')}">${
    props.content
  }</div>`

  if (props.text || props.html) {
    const $text = newDiv(cn('alert-content'))
    if (props.html) {
      if (typeof props.html === 'string') {
        $text.innerHTML = props.html
      } else {
        $text.append(props.html)
      }
    } else {
      $text.textContent = props.text || 'hello'
    }
    $wrapper.append($text)
  }

  const $root = getContainer()

  const open = () => {
    bodyScroll()
    $root.append($box)
  }

  const close = (status: number) => {
    props.onClose()
    changeAnimation($wrapper, cn('alert-out'))
    return new Promise<void>((resolve) => {
      animationendHandle($wrapper, (e: string) => {
        if (e === cn('alert-out')) {
          $box.remove()
          if (!document.querySelector(`.${cn('alert')}`)) {
            bodyScroll(false)
          }
          props.onClosed(status)
          resolve()
        }
      })
    })
  }

  $box.onclick = (e) => {
    if (props.hideClose) {
      return
    }
    if (e.target === $box) {
      props.onClose()
      close(0)
    }
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
    const $close = CloseIcon()

    $close.onclick = () => {
      close(0)
    }

    $wrapper.append($close)
  }

  return { close, open, $el: $wrapper }
}

export const alert = MakeMsg(GmAlert, 1)
