import styles from '../main.module.scss'

export function newDiv(...className: string[]) {
  const $div = document.createElement('div')
  $div.classList.add(...className)
  return $div
}

export function warpByDiv(...el: HTMLElement[]) {
  const $tmp = document.createElement('div')
  $tmp.append(...el)

  return $tmp
}

export function slideOpenEl(el: HTMLElement, duration: string) {
  const { marginBottom } = el.style
  el.style.marginBottom = '0'
  el.style.opacity = '0'
  const height = el.offsetHeight
  const maxHeight = height + 10

  el.style.transition = `all ${duration}`

  el.style.maxHeight = '0'

  setTimeout(() => {
    el.style.maxHeight = `${maxHeight}px`
    el.style.marginBottom = marginBottom
  }, 10)
}

const getContainer = () => {
  let $root = document.querySelector<HTMLElement>(
    `.${styles['gmsg-container']}`,
  )

  if (!$root) {
    $root = newDiv(styles['gmsg-container'], 'gmsg-global-vars')
    document.body.append($root)
  }

  return $root
}

const getCenterRoot = () => {
  let $root = document.querySelector<HTMLElement>(
    `.${styles['gmsg-wrapper-center']}`,
  )
  if ($root) return $root
  $root = newDiv(styles['gmsg-wrapper-center'])
  getContainer().append($root)
  return $root
}

const getTopRightRoot = () => {
  let $scrollContainer = document.querySelector<HTMLElement>(
    `.${styles['scroll-content']}`,
  )
  if ($scrollContainer) return $scrollContainer
  const $wrapper = newDiv(styles['gmsg-wrapper-top-right'])
  const $scrollWrapper = newDiv(styles['scroll-wrapper'])
  $scrollContainer = newDiv(styles['scroll-content'])
  $scrollWrapper.append($scrollContainer)
  $wrapper.append($scrollWrapper)
  getContainer().append($wrapper)

  return $scrollContainer
}

const getAlertContariner = () => {
  let $wrapper = document.querySelector<HTMLElement>(
    `.${styles['gmsg-wrapper-center-alert']}`,
  )
  if ($wrapper) return $wrapper
  $wrapper = newDiv(styles['gmsg-wrapper-center-alert'])
  getContainer().append($wrapper)

  return $wrapper
}

export const getRoot = (
  position: 'center' | 'top-right' | 'alert' = 'center',
) => {
  switch (position) {
    case 'center':
      return getCenterRoot()
    case 'top-right':
      return getTopRightRoot()
    case 'alert':
      return getAlertContariner()
  }
}
