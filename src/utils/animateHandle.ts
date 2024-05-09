import EventHandler from './EventHandler'
import { changeStyle, resetStyle } from './html'

export function animationendHandle(
  $el: HTMLElement,
  handle: (animationName: string) => void,
) {
  const animationend = (e: AnimationEvent) => {
    handle(e.animationName)
  }
  EventHandler.on($el, 'animationend', animationend)
}

export function changeAnimation($el: HTMLElement, animationName: string) {
  resetStyle($el, ['animation-name'])
  // 强制重绘
  // eslint-disable-next-line no-unused-expressions
  $el.offsetHeight
  changeStyle($el, [`animation-name:${animationName}`])
}
