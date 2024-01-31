import { changeAnimation } from './animateHandle'

export function cn(className: string) {
  return `gmal-${className}`
}

export function newDiv(...className: string[]) {
  const $div = document.createElement('div')
  $div.classList.add(...className)
  return $div
}

export function setMsgCount($el: HTMLElement, count: number) {
  const countClassName = cn('count')
  let $count = $el.querySelector(`.${countClassName}`) as HTMLElement
  if (!$count) {
    $count = document.createElement('span')
    $count.classList.add(countClassName)

    $el.append($count)
  }
  $count.innerHTML = `${count > 99 ? '99' : count}`
  changeAnimation($count, '')
  setTimeout(() => {
    changeAnimation($count, cn('shake'))
  })
}

export const getContainer = () => {
  let $root = document.querySelector<HTMLElement>(`.gmal`)

  if (!$root) {
    $root = newDiv('gmal')
    document.body.append($root)
  }

  return $root
}

export const getMessageContainer = () => {
  let $root = document.querySelector<HTMLElement>(`.${cn('msg-box')}`)
  if ($root) return $root
  $root = newDiv(cn('msg-box'))
  getContainer().append($root)
  return $root
}

export const getNoticeContainer = () => {
  let $wrapper = document.querySelector<HTMLElement>(`.${cn('notice-box')}`)
  if ($wrapper) return $wrapper
  $wrapper = newDiv(cn('notice-box'))
  getContainer().append($wrapper)

  return $wrapper
}

// 用于修改样式的工具类，并且可以减少回流重绘，后面代码中会频繁用到
export function changeStyle(el: HTMLElement, arr: string[]): void {
  const original = el.style.cssText.split(';')
  original.pop()

  el.style.cssText = `${original.concat(arr).join(';')};`
}

// 用于设置滚动条
export function bodyScroll(lock = true) {
  const $body = document.body
  if (lock) {
    $body.style.overflow = 'hidden'
    // set padding
    const $html = document.documentElement
    const bodyWidth = $body.clientWidth
    const htmlWidth = $html.clientWidth
    const scrollWidth = htmlWidth - bodyWidth
    $body.style.paddingRight = `${scrollWidth}px`
  } else {
    $body.style.overflow = ''
    $body.style.paddingRight = ''
  }
}
