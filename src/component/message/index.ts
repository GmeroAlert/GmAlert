import { getRoot, newDiv } from '../../utils/html'
import { SvgIcon } from '../icons'
import styles from './message.module.scss'

export const MessageState = {
  opening: styles['message-movein'],
  done: '',
  closing: styles['message-moveout'],
}

interface PropsMessage {
  type: 'success' | 'error' | 'warning' | 'info' | 'loading'
  text: string
}

export default function GmMessage(props: PropsMessage): AlertType {
  const icon = SvgIcon(props.type, styles.icon)
  const $wrapper = newDiv(styles['message-wrapper'])
  const $main = newDiv(styles['message-main'])
  $wrapper.append($main)
  $main.innerHTML = `${icon}<div class=${styles['message-content']}>${props.text}</div>`

  const open = () => {
    getRoot('center').append($wrapper)
    $wrapper.style.animationName = MessageState.opening
    return new Promise<void>((resolve) => {
      const handle = (e: AnimationEvent) => {
        if (e.animationName === MessageState.opening) {
          $wrapper.style.animationName = MessageState.done
          $wrapper.removeEventListener('animationend', handle)
          resolve()
        }
      }
      $wrapper.addEventListener('animationend', handle)
    })
  }

  const close = () => {
    $main.style.maxHeight = `${$main.offsetHeight}px`
    $wrapper.style.animationName = MessageState.closing
    $main.style.animationName = styles['message-out']

    return new Promise<void>((resolve) => {
      const handle = (e: AnimationEvent) => {
        if (e.animationName === MessageState.closing) {
          $wrapper.remove()
          resolve()
        }
      }
      $wrapper.addEventListener('animationend', handle)
    })
  }

  return { open, close, $el: $wrapper }
}
