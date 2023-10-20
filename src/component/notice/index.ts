import { animationendHandle } from '../../utils/eventHandle'
import { changeStyle, getRoot, newDiv, slideOpenEl } from '../../utils/html'
import { AnimatedIcon } from '../icons'
import type { MsgType } from '../message'

import styles from './notice.module.scss'

export interface PropsNotice {
  type: 'success' | 'error' | 'warning' | 'info' | 'loading'
  content: string
  onClosed: () => void
}

const noticeState = {
  opening: styles['notice-movein'],
  done: '',
  closing: styles['notice-moveout'],
}

export default function GmNotice(props: PropsNotice): MsgType {
  const icon = AnimatedIcon(props.type, true, styles['notice-icon'])
  const $wrapper = newDiv(styles.notice)

  $wrapper.innerHTML = `<div class="${styles['notice-main']}">${icon}\
  <div class="${styles['notice-content']}">${props.content}</div></div>`

  const open = () => {
    getRoot('notice').prepend($wrapper)
    return new Promise<void>((resolve) => {
      slideOpenEl($wrapper, '.1s')
      setTimeout(() => {
        $wrapper.style.transition = ''
        changeStyle($wrapper, [
          'opacity: 1',
          `animation-name: ${noticeState.opening}`,
        ])
      }, 100)
      const handle = (e: string) => {
        if (e === noticeState.opening) {
          resolve()
          return true
        }

        return false
      }
      animationendHandle($wrapper, handle)
    })
  }

  const close = () => {
    return new Promise<void>((resolve) => {
      $wrapper.style.maxHeight = `${$wrapper.offsetHeight + 10}px`
      $wrapper.style.animationName = noticeState.closing
      const handle = (e: string) => {
        if (e === noticeState.closing) {
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
