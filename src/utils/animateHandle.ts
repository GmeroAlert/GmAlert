import { changeStyle, resetStyle } from './html'
import useEventListener from './useEventListener'

export function animationendHandle(
  $el: HTMLElement,
  handle: (animationName: string) => void,
) {
  const animationend = (e: AnimationEvent) => {
    handle(e.animationName)
  }
  useEventListener($el, 'animationend', animationend)
}

export function changeAnimation($el: HTMLElement, animationName: string) {
  resetStyle($el, ['animation-name'])
  // 强制重绘
  $el.offsetHeight
  changeStyle($el, [`animation-name:${animationName}`])
}
