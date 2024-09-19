import ntcCss from 'inline:../styles/notice.scss'
import { MakeMsg } from '../core/Msg'
import { animationendHandle, changeAnimation } from '../utils/animateHandle'
import {
  changeStyle,
  cn,
  getContainer,
  injectStyle,
  newDiv,
  resetStyle,
} from '../utils/html'
import type { MsgType } from './message'
import type { PropsNotice } from './types'

export function GmNotice(props: PropsNotice): MsgType {
  const $wrapper = newDiv(cn('notice'))
  const localProps = { ...props }

  const inst: MsgType = {} as MsgType

  const update = (conf: Partial<PropsNotice>) => {
    const { content, beforeClose, bottom, background, color, onClosed } = Object.assign(localProps, conf)
    resetStyle($wrapper, ['bottom', 'top'])
    changeStyle($wrapper, [
      bottom ? 'bottom:0' : 'top:0',
      bottom ? '--y:100%' : '--y:-100%',
      background ? `background:${background}` : '',
      color ? `color:${color}` : '',
    ])

    $wrapper.innerHTML = `<div class="${cn('notice-main')}"><div class="${cn(
      'notice-content',
    )}">${content}</div></div>`

    inst.open = () => {
      getContainer().append($wrapper)
      changeAnimation($wrapper, cn('open'))
    }

    inst.close = async (status: number) => {
      await beforeClose(status)
      changeAnimation($wrapper, cn('close'))
      return new Promise<void>((resolve) => {
        animationendHandle($wrapper, (animationName) => {
          if (animationName === cn('close')) {
            $wrapper.remove()
            onClosed(status)
            resolve()
          }
        })
      })
    }
  }

  inst.update = update
  inst.$el = $wrapper

  update(props)

  return inst
}

export const notice = MakeMsg(GmNotice, () => {
  injectStyle(ntcCss)
})
