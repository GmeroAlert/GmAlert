import { changeAnimation } from './animateHandle'

export function cn(className: string) {
  return `gmal-${className}`
}

export function varName(name: string) {
  return `var(--${cn(name)})`
}

export function newEl(tag: string, ...className: string[]) {
  const $el = document.createElement(tag)
  $el.classList.add(...className)
  return $el
}

export function newDiv(...className: string[]) {
  return newEl('div', ...className)
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
    // set padding
    $body.style.paddingRight = `${
      window.innerWidth - document.documentElement.clientWidth
    }px`
    $body.style.overflow = 'hidden'
  } else {
    $body.style.overflow = ''
    $body.style.paddingRight = ''
  }
}
