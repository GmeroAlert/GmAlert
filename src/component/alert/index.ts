import { animationendHandle, changeAnimation } from '../../utils/animateHandle'
import { getRoot, newDiv } from '../../utils/html'
import { AnimatedIcon, SvgIcon } from '../icons'
import type { MsgType, PropsMessage } from '../message'
import styles from './alert.module.scss'

interface PropsAlert extends PropsMessage {
  text?: string
  showClose?: boolean
  showConfirm?: boolean
  showCancel?: boolean
}

function Button(text: string, onClick: () => void) {
  const $btn = document.createElement('button')
  $btn.textContent = text
  $btn.onclick = onClick
  $btn.classList.add(styles['alert-btn'])

  return $btn
}

export default function GmAlert(props: PropsAlert): MsgType {
  const $wrapper = newDiv(styles.alert)
  const icon = AnimatedIcon(props.type, false, styles['alert-icon'])

  $wrapper.innerHTML = `${icon}<div class="${styles['alert-title']}">${props.content}</div>`

  if (props.text) {
    const $text = newDiv(styles['alert-content'])
    $text.textContent = props.text
    $wrapper.append($text)
  }

  const $root = getRoot(2)

  const open = () => {
    $root.append($wrapper)
  }

  const close = (status: number) => {
    changeAnimation($wrapper, styles['alert-hide'])
    return new Promise<void>((resolve) => {
      animationendHandle($wrapper, (e: string) => {
        if (e === styles['alert-hide']) {
          $wrapper.remove()
          props.onClosed(status)
          resolve()
        }
      })
    })
  }

  if (props.showCancel || props.showConfirm) {
    const $buttons = newDiv(styles['alert-btn-group'])
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

  if (props.showClose !== false) {
    const $close = newDiv()
    $close.innerHTML = SvgIcon('close', styles['alert-close'])

    $close.onclick = () => {
      close(0)
    }

    $wrapper.append($close)
  }

  return { close, open, $el: $wrapper }
}
