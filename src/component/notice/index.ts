import { animationendHandle, changeAnimation } from '../../utils/animateHandle'
import { changeStyle, getRoot, newDiv } from '../../utils/html'
import { AnimatedIcon } from '../icons'
import type { MsgType, PropsMessage } from '../message'

import styles from './notice.module.scss'

export default function GmNotice(props: PropsMessage): MsgType {
  const icon = AnimatedIcon(props.type, true, styles['notice-icon'])
  const $wrapper = newDiv(styles.notice)

  $wrapper.innerHTML = `<div class="${styles['notice-main']}">${icon}\
  <div class="${styles['notice-content']}">${props.content}</div></div>`

  animationendHandle($wrapper, (animationName) => {
    if (animationName === styles.openin) {
      changeStyle($wrapper, [
        `opacity:1`,
        `animation-name:${styles['notice-movein']}`,
      ])
    }

    if (animationName === styles['notice-moveout']) {
      changeAnimation($wrapper, styles.closeout)
    }
  })

  const open = () => {
    getRoot(1).prepend($wrapper)
    changeStyle($wrapper, [`max-height:${$wrapper.offsetHeight + 10}px`])
    changeAnimation($wrapper, styles.openin)
  }

  const close = (status: number) => {
    return new Promise<void>((resolve) => {
      changeAnimation($wrapper, styles['notice-moveout'])
      animationendHandle($wrapper, (animationName) => {
        if (animationName === styles.closeout) {
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
