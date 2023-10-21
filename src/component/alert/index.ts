import { animationendHandle, changeAnimation } from '../../utils/animateHandle'
import { getRoot, newDiv } from '../../utils/html'
import { AnimatedIcon, SvgIcon } from '../icons'
import type { MsgType, PropsMessage } from '../message'
import styles from './alert.module.scss'

interface PropsAlert extends PropsMessage {
  text?: string
  showClose?: boolean
  onConfirm?: () => void
  onCancel?: () => void
}

function Button(text: string, onClick: () => void) {
  const $btn = document.createElement('button')
  $btn.textContent = text
  $btn.onclick = onClick
  $btn.classList.add(styles['alert-btn'])

  return $btn
}

export default function GmAlert(props: PropsAlert): MsgType {
  const type = props.type || 'info'
  const $wrapper = newDiv(styles.alert)
  const icon = AnimatedIcon(type, false, styles['alert-icon'])

  $wrapper.innerHTML = `${icon}<div class="${styles['alert-title']}">${props.content}</div>`

  if (props.text) {
    const $text = newDiv(styles['alert-content'])
    $text.textContent = props.text
    $wrapper.append($text)
  }

  const $root = getRoot(2)

  const open = () => {
    $root.append($wrapper)
    return new Promise<void>((resolve) => {
      const handle = (animationName: string) => {
        if (animationName === styles['alert-show']) {
          resolve()
          return true
        }
        return false
      }

      animationendHandle($wrapper, handle)
    })
  }

  const close = () => {
    changeAnimation($wrapper, styles['alert-hide'])
    return new Promise<void>((resolve) => {
      const handle = (e: string) => {
        if (e === styles['alert-hide']) {
          $wrapper.remove()
          props.onClosed()
          resolve()
          return true
        }
        return false
      }
      animationendHandle($wrapper, handle)
    })
  }

  if (props.onCancel || props.onConfirm) {
    const $buttons = newDiv(styles['alert-btn-group'])
    props.onCancel && $buttons.append(Button('取消', props.onCancel))
    props.onConfirm && $buttons.append(Button('确定', props.onConfirm))
    $wrapper.append($buttons)
  }

  if (props.showClose) {
    const $close = newDiv(styles['alert-close'])
    $close.innerHTML = SvgIcon('close')

    $close.onclick = () => {
      close()
    }

    $wrapper.append($close)
  }

  return { close, open, $el: $wrapper }
}
