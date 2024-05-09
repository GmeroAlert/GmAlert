export function cn(className: string) {
  return `gmal-${className}`
}

export function varName(name: string) {
  return `var(--${cn(name)})`
}

export function newEl<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  ...className: string[]
) {
  const $el = document.createElement(tag)
  $el.classList.add(...className)
  return $el
}

export function newDiv(...className: string[]) {
  return newEl('div', ...className)
}

export const getContainer = () => {
  let $root = querySelector<HTMLElement>(`.gmal`)

  if (!$root) {
    $root = newDiv('gmal')
    document.body.append($root)
  }

  return $root
}

// 用于修改样式的工具类，并且可以减少回流重绘，后面代码中会频繁用到
export function changeStyle(el: HTMLElement, arr: string[]): void {
  const original = el.style.cssText.split(';')
  original.pop()

  el.style.cssText = `${original.concat(arr).join(';')};`
}

// 用于重置样式
export function resetStyle(el: HTMLElement, arr: string[]): void {
  arr.forEach((item) => {
    el.style.removeProperty(item)
  })
}

// 用于设置滚动条
export function bodyScroll(lock = true) {
  const $body = document.body
  if (lock) {
    // set padding
    changeStyle($body, [
      'overflow: hidden',
      `padding-right: ${
        window.innerWidth - document.documentElement.clientWidth
      }px`,
    ])
  } else {
    resetStyle($body, ['overflow', 'padding-right'])
  }
}

// 用于获取元素
export function querySelector<T extends HTMLElement = HTMLElement>(
  selector: string,
  $el: HTMLElement = document.body,
): T {
  return $el.querySelector(selector) as T
}
