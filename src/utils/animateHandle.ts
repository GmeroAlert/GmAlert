export function animationendHandle(
  $el: HTMLElement,
  handle: (animationName: string) => void,
) {
  const animationend = (e: AnimationEvent) => {
    handle(e.animationName)
  }
  $el.addEventListener('animationend', animationend)
}

export function changeAnimation($el: HTMLElement, animationName: string) {
  $el.style.animationName = animationName
}
