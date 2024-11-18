import alertCss from 'inline:../styles/alert.scss'
import { SpinIcon } from '../component/svgicons/spin'
import { MakeMsg } from '../core/Msg'
import { animationendHandle, changeAnimation } from '../utils/animateHandle'
import {
  bodyScroll,
  cn,
  getContainer,
  injectStyle,
  newDiv,
  newEl,
} from '../utils/html'
import useEventListener from '../utils/useEventListener'
import type { Fn } from '../utils/types'
import type { MsgType } from './message'
import type { PropsAlert } from './types'

function Button(text: string, onClick: () => Promise<void>) {
  const $btn = newEl('button', cn('hairline'))
  $btn.textContent = text
  let isPending = false
  $btn.onclick = async () => {
    if (isPending)
      return
    isPending = true
    // 优化点击后的体验
    setTimeout(() => {
      if (isPending)
        $btn.innerHTML = SpinIcon('1.4em')
    }, 50)
    await onClick()
    $btn.textContent = text
    isPending = false
  }
  $btn.classList.add(cn('alert-btn'))

  return $btn
}

function buildOverlay(onClick: Fn) {
  const $overlay = newDiv(cn('overlay'))
  getContainer().append($overlay)
  animationendHandle($overlay, (e: string) => {
    if (e === cn('fade-out')) {
      bodyScroll(false)
      $overlay.remove()
    }
  })

  const dismiss = useEventListener($overlay, 'click', onClick)

  const open = () => {
    bodyScroll()
    changeAnimation($overlay, cn('fade-in'))
  }

  const close = () => {
    dismiss()
    changeAnimation($overlay, cn('fade-out'))
  }

  return { open, close }
}

export function GmAlert(props: PropsAlert): MsgType {
  const localProps = { ...props }
  const $wrapper = newDiv(cn('alert'))
  const shake = () => {
    changeAnimation($wrapper, cn('shake'))
  }

  let isClosing = false
  const $text = newDiv(cn('alert-content'))
  const $buttons = newDiv(cn('alert-btn-group'), cn('hairline'))

  const inst: MsgType = {} as MsgType

  const overlay = buildOverlay(() => {
    inst.close(-3)
  })

  const update = (conf: Partial<PropsAlert>) => {
    const { content, text, html, beforeClose, onClosed, cancelLabel, confirmLabel } = Object.assign(localProps, conf)
    // title
    $wrapper.innerHTML = content ? `<div class="${cn('alert-title')}">${content}</div>` : ''

    // body
    if (text || html) {
      $text.innerHTML = ''
      if (html) {
        if (typeof html === 'string') {
          $text.innerHTML = html
        }
        else {
          $text.append(html)
        }
      }
      else {
        $text.textContent = text!
      }
      $wrapper.append($text)
    }
    else { $text.remove() }

    // button
    $buttons.innerHTML = ''
    if (cancelLabel || confirmLabel) {
      cancelLabel && $buttons.append(Button(cancelLabel, () => inst.close(0)))
      confirmLabel && $buttons.append(Button(confirmLabel, () => inst.close(1)))
      $wrapper.append($buttons)
    }
    else { $buttons.remove() }

    inst.open = () => {
      getContainer().append($wrapper)
      changeAnimation($wrapper, cn('alert-in'))
      overlay.open()
    }
    inst.close = async (status: number) => {
      if (status === -2) {
        await beforeClose(status)
        overlay.close()
        $wrapper.remove()
        return
      }

      if (isClosing) {
        return shake()
      }
      isClosing = true
      const canClose = await beforeClose(status)
      if (!canClose) {
        isClosing = false
        return shake()
      }
      changeAnimation($wrapper, cn('alert-out'))
      overlay.close()
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

export const alert = MakeMsg(
  GmAlert,
  () => {
    injectStyle(alertCss)
  },
  { timeout: 0, confirmLabel: '确定' },
)
