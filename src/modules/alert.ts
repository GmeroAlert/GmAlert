import { animationendHandle, changeAnimation } from '../utils/animateHandle'
import {
  bodyScroll,
  changeStyle,
  cn,
  getContainer,
  newDiv,
  newEl,
  querySelector,
} from '../utils/html'
import { MakeMsg } from '../core/Msg'
import { CloseIcon } from '../component/icons/close'
import type { MsgType } from './message'
import type { PropsAlert } from './types'

function Button(text: string, onClick: () => void) {
  const $btn = newEl('button')
  $btn.textContent = text
  $btn.onclick = onClick
  $btn.classList.add(cn('alert-btn'))

  return $btn
}

let overLayStatus = 'closed'

function overLaySwitch(open: boolean) {
  let $overlay = querySelector(`.${cn('overlay')}`)
  if (!$overlay) {
    $overlay = newDiv(cn('overlay'))
    getContainer().append($overlay)
  }
  if (open) {
    if (overLayStatus === 'open' || overLayStatus === 'opening') {
      return
    }
    bodyScroll()
    overLayStatus = 'opening'
    changeAnimation($overlay, cn('fade-in'))
    changeStyle($overlay, ['display: block'])
  } else {
    if (overLayStatus === 'closed' || overLayStatus === 'closing') {
      return
    }
    overLayStatus = 'closing'
    changeAnimation($overlay, cn('fade-out'))
  }

  animationendHandle($overlay, (e: string) => {
    if (e === cn('fade-in')) {
      overLayStatus = 'open'
    }
    if (e === cn('fade-out')) {
      overLayStatus = 'none'
      bodyScroll(false)
      changeStyle($overlay, ['display: none'])
    }
  })
}

export function GmAlert(props: PropsAlert): MsgType {
  const $wrapper = newDiv(cn('alert'))

  if (props.content) {
    $wrapper.innerHTML = `<div class="${cn('alert-title')}">${
      props.content
    }</div>`
  }

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

  const close = (status: number) => {
    if (status !== -2) {
      overLaySwitch(false)
    }
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

  const open = () => {
    overLaySwitch(true)
    getContainer().append($wrapper)
    changeAnimation($wrapper, cn('alert-in'))
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

export const alert = MakeMsg(GmAlert, 0)
