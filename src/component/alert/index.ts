import { getRoot, newDiv } from '../../utils/html'
import { AnimatedIcon, SvgIcon } from '../icons'
import styles from './alert.module.scss'

interface PropsAlert {
  type?: 'success' | 'error' | 'warning' | 'info' | 'loading'
  title: string
  text?: string
  showClose?: boolean
  onConfirm?: () => void
  onCancel?: () => void
  onClosed?: () => void
}

export interface AlertMethod {
  open: () => Promise<void>
  close: () => Promise<void>
  $el: HTMLElement
}

function Button(text: string, onClick: () => void) {
  const $btn = document.createElement('button')
  $btn.textContent = text
  $btn.onclick = onClick
  $btn.classList.add(styles['alert-button'])

  return $btn
}

export default function GmAlert(props: PropsAlert): AlertMethod {
  const type = props.type || 'info'
  const $wrapper = newDiv(styles.alert)
  const icon = AnimatedIcon(type, false, styles['alert-icon'])

  $wrapper.innerHTML = `${icon}<div class="${styles['alert-title']}">${props.title}</div>`

  if (props.text) {
    const $text = newDiv(styles['alert-content'])
    $text.textContent = props.text
    $wrapper.append($text)
  }

  const $root = getRoot('alert')

  const open = () => {
    $wrapper.classList.add(styles['is-opening'])
    $root.append($wrapper)
    return new Promise<void>((resolve) => {
      const handle = (e: AnimationEvent) => {
        if (e.animationName === styles['alert-show']) {
          $wrapper.classList.remove(styles['is-opening'])
          $wrapper.removeEventListener('animationend', handle)
          resolve()
        }
      }
      $wrapper.addEventListener('animationend', handle)
    })
  }

  const close = () => {
    $wrapper.classList.add(styles['is-closing'])
    $wrapper.style.animationName = styles['alert-hide']
    return new Promise<void>((resolve) => {
      const handle = (e: AnimationEvent) => {
        if (e.animationName === styles['alert-hide']) {
          $wrapper.remove()
          if (props.onClosed) {
            props.onClosed()
          }
          resolve()
        }
      }
      $wrapper.addEventListener('animationend', handle)
    })
  }

  if (props.onCancel || props.onConfirm) {
    const $buttons = newDiv(styles['alert-button-container'])
    if (props.onCancel) {
      const $cancel = Button('取消', props.onCancel)
      $buttons.append($cancel)
    }
    if (props.onConfirm) {
      const $confirm = Button('确定', props.onConfirm)
      $buttons.append($confirm)
    }
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
