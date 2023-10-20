import { animationendHandle } from '../../utils/eventHandle'
import { getRoot, newDiv } from '../../utils/html'
import { SvgIcon } from '../icons'
import styles from './message.module.scss'

export const MessageState = {
  opening: styles['message-movein'],
  done: '',
  closing: styles['message-moveout'],
}

export interface MsgType {
  open: () => Promise<void>
  close: () => Promise<void>
  $el: HTMLElement
}

interface PropsMessage {
  type: 'success' | 'error' | 'warning' | 'info' | 'loading'
  content: string
  onClosed: () => void
}

export default function GmMessage(props: PropsMessage): MsgType {
  const icon = SvgIcon(props.type, styles.icon)
  const $wrapper = newDiv(styles['message-wrapper'])
  const $main = newDiv(styles['message-main'])
  $wrapper.append($main)
  $main.innerHTML = `${icon}<div class=${styles['message-content']}>${props.content}</div>`

  const open = () => {
    getRoot('message').append($wrapper)
    $wrapper.style.animationName = MessageState.opening
    return new Promise<void>((resolve) => {
      const handle = (e: string) => {
        if (e === MessageState.opening) {
          resolve()
          return true
        }
        return false
      }
      animationendHandle($wrapper, handle)
    })
  }

  const close = () => {
    $main.style.maxHeight = `${$main.offsetHeight}px`
    $wrapper.style.animationName = MessageState.closing
    $main.style.animationName = styles['message-out']

    return new Promise<void>((resolve) => {
      const handle = (e: string) => {
        if (e === MessageState.closing) {
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

  return {
    open,
    close,
    $el: $wrapper,
  }
}
