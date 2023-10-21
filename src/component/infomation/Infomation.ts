import { animationendHandle, changeAnimation } from '../../utils/animateHandle'
import { getRoot, newDiv } from '../../utils/html'
import type { MsgType, PropsMessage } from '../message'
import styles from './infomation.module.scss'

interface PropsInfo extends PropsMessage {
  headerLeft?: string
  headerRight?: string
}

const ColorMap: Record<string, string> = {
  info: '#409eff',
  success: '#67c23a',
  warning: '#e6a23c',
  error: '#f56c6c',
}

export default function GmInformation(props: PropsInfo): MsgType {
  const color = ColorMap[props.type || 'info'] || ColorMap.info
  const $wrapper = newDiv(styles.infomation)
  $wrapper.innerHTML = `<div class="${
    styles['infomation-header']
  }"><div class="${
    styles['infomation-status']
  }" style="background: ${color};"></div><div style="margin-left: .5em;">${
    props.headerLeft || '你有一条消息'
  }</div><div>${props.headerRight || ''}</div></div><div class="${
    styles['infomation-content']
  }">${props.content}</div>`

  const $root = getRoot(2)

  const open = () => {
    $root.append($wrapper)
    return new Promise<void>((resolve) => {
      const handle = (e: string) => {
        if (e === styles['infomation-move-in']) {
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
      changeAnimation($wrapper, styles['infomation-move-out'])
      const handle = (e: string) => {
        if (e === styles['infomation-move-out']) {
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

  return { open, close, $el: $wrapper }
}
