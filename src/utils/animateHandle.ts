export function animationendHandle(
  $el: HTMLElement,
  handle: (animationName: string) => boolean,
) {
  const animationend = (e: AnimationEvent) => {
    if (handle(e.animationName))
      $el.removeEventListener('animationend', animationend)
  }
  $el.addEventListener('animationend', animationend)
}

export function changeAnimation($el: HTMLElement, animationName: string) {
  $el.style.animationName = animationName
}
