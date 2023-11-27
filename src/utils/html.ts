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
  let $root = document.querySelector<HTMLElement>(`.gmal-box`)

  if (!$root) {
    $root = newDiv(cn('box'))
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

export function injectCss(css: string) {
  const $style = document.createElement('style')
  $style.innerHTML = css
  document.head.append($style)
}
