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
import { SpinIcon } from '../component/icons'
import EventHandler from '../utils/EventHandler'
import type { MsgType } from './message'
import type { PropsAlert } from './types'

function Button(text: string, onClick: () => Promise<void>) {
  const $btn = newEl('button', cn('hairline'))
  $btn.textContent = text
  let isPending = false
  $btn.onclick = async () => {
    if (isPending) return
    isPending = true
    // 优化点击后的体验
    setTimeout(() => {
      if (isPending) $btn.innerHTML = SpinIcon('1.4em')
    }, 50)
    await onClick()
    $btn.textContent = text
    isPending = false
  }
  $btn.classList.add(cn('alert-btn'))

  return $btn
}

// 0 已经关闭 1 关闭中 2 打开中 3 已经打开
let overLayStatus = 0

function overLaySwitch(open: boolean) {
  let $overlay = querySelector(`.${cn('overlay')}`)
  if (!$overlay) {
    $overlay = newDiv(cn('overlay'))
    getContainer().append($overlay)
    animationendHandle($overlay, (e: string) => {
      if (e === cn('fade-in')) {
        overLayStatus = 3
      }
      if (e === cn('fade-out')) {
        overLayStatus = 0
        bodyScroll(false)
        changeStyle($overlay, ['display: none'])
      }
    })
  }
  if (open) {
    if (overLayStatus > 1) {
      return $overlay
    }
    bodyScroll()
    overLayStatus = 2
    changeAnimation($overlay, cn('fade-in'))
    changeStyle($overlay, ['display: block'])
  } else {
    if (overLayStatus < 2) {
      return $overlay
    }
    overLayStatus = 1
    changeAnimation($overlay, cn('fade-out'))
  }

  return $overlay
}

export function GmAlert(props: PropsAlert): MsgType {
  const $wrapper = newDiv(cn('alert'))

  let isPending = false

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
      $text.textContent = props.text!
    }
    $wrapper.append($text)
  }

  let overlayClick: () => void

  const shake = () => {
    changeAnimation($wrapper, cn('shake'))
  }

  const close = async (status: number) => {
    if (isPending) {
      shake()
      return
    }
    isPending = true
    const ifColose = await props.beforeClose(status)
    if (!ifColose) {
      isPending = false
      shake()
      return
    }
    const $overlay = querySelector(`.${cn('overlay')}`)
    if (status !== -2) {
      overLaySwitch(false)
    }
    EventHandler.off($overlay, 'click', overlayClick)
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

  overlayClick = () => {
    close(-3)
  }

  const open = () => {
    EventHandler.on(overLaySwitch(true), 'click', overlayClick)
    getContainer().append($wrapper)
    changeAnimation($wrapper, cn('alert-in'))
  }

  if (props.cancelLabel || props.confirmLabel) {
    const $buttons = newDiv(cn('alert-btn-group'), cn('hairline'))
    props.cancelLabel &&
      $buttons.append(
        Button(props.cancelLabel, async () => {
          await close(2)
        }),
      )
    props.confirmLabel &&
      $buttons.append(
        Button(props.confirmLabel, async () => {
          await close(1)
        }),
      )
    $wrapper.append($buttons)
  }

  return { close, open, $el: $wrapper }
}

export const alert = MakeMsg(GmAlert, { timeout: 0, confirmLabel: '确定' })
