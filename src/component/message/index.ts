import { animationendHandle, changeAnimation } from '../../utils/animateHandle'
import { getRoot, newDiv } from '../../utils/html'
import { SvgIcon } from '../icons'
import styles from './message.module.scss'

export const MessageState = {
  opening: styles['msg-movein'],
  done: '',
  closing: styles['msg-moveout'],
}

export interface MsgType {
  open: () => void
  close: (status: number) => Promise<void>
  $el: HTMLElement
}

export interface PropsMessage {
  type: 'success' | 'error' | 'warning' | 'info' | 'loading'
  content: string
  /**
   *
   * @param status 0: close by user cancel, 1: close by user confirm, -1: close by timeout, -2 or undefined : close unexpectedly
   * @returns
   */
  onClosed: (status: number) => void
}

export default function GmMessage(props: PropsMessage): MsgType {
  const icon = SvgIcon(props.type, styles.icon)
  const $wrapper = newDiv(styles.msg)
  const $main = newDiv(styles['msg-main'])
  $wrapper.append($main)
  $main.innerHTML = `${icon}<div class=${styles['msg-content']}>${props.content}</div>`

  const open = () => {
    getRoot(0).append($wrapper)
    changeAnimation($wrapper, MessageState.opening)
  }

  const close = (status: number) => {
    $main.style.maxHeight = `${$main.offsetHeight}px`
    changeAnimation($wrapper, MessageState.closing)
    changeAnimation($main, styles['msg-out'])

    return new Promise<void>((resolve) => {
      animationendHandle($wrapper, (e: string) => {
        if (e === MessageState.closing) {
          $wrapper.remove()
          props.onClosed(status)
          resolve()
        }
      })
    })
  }

  return {
    open,
    close,
    $el: $wrapper,
  }
}
