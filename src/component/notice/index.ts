import { getRoot, newDiv, slideOpenEl } from '../../utils/html'
import { AnimatedIcon } from '../icons'

import styles from './notice.module.scss'

export interface PropsNotice {
  type: 'success' | 'error' | 'warning' | 'info' | 'loading'
  text: string
}

const noticeState = {
  opening: styles['notice-movein'],
  done: '',
  closing: styles['notice-moveout'],
}

export default function GmNotice(props: PropsNotice): AlertType {
  const icon = AnimatedIcon(props.type, true, styles['notice-icon'])
  const $wrapper = newDiv(styles['notice-wrapper'])

  $wrapper.innerHTML = `<div class="${styles['notice-main']}">${icon}\
  <div class="${styles['notice-content']}">${props.text}</div></div>`

  const open = () => {
    getRoot('top-right').prepend($wrapper)
    return new Promise<void>((resolve) => {
      slideOpenEl($wrapper, '.1s')
      setTimeout(() => {
        $wrapper.style.opacity = '1'
        $wrapper.style.animationName = noticeState.opening
      }, 100)
      const handle = (e: AnimationEvent) => {
        if (e.animationName === noticeState.opening) {
          $wrapper.removeEventListener('animationend', handle)
          resolve()
        }
      }
      $wrapper.addEventListener('animationend', handle)
    })
  }

  const close = () => {
    return new Promise<void>((resolve) => {
      $wrapper.style.maxHeight = `${$wrapper.offsetHeight + 10}px`
      $wrapper.style.animationName = noticeState.closing
      const handle = (e: AnimationEvent) => {
        if (e.animationName === noticeState.closing) {
          $wrapper.remove()
          resolve()
        }
      }
      $wrapper.addEventListener('animationend', handle)
    })
  }

  return { open, close, $el: $wrapper }
}
