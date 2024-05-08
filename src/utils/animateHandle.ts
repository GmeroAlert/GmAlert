import EventHandler from './EventHandler'

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
  $el.style.animationName = animationName
}
