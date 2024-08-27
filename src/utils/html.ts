const doc = document
const docEl = doc.documentElement

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
  const $el = doc.createElement(tag)
  $el.classList.add(...className)
  return $el
}

export function newDiv(...className: string[]) {
  return newEl('div', ...className)
}

export function getContainer() {
  let $root = querySelector<HTMLElement>(`.gmal`)

  if (!$root) {
    $root = newDiv('gmal')
    doc.body.append($root)
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
  const $body = doc.body
  if (lock) {
    // set padding
    changeStyle($body, [
      'overflow: hidden',
      `padding-right: ${window.innerWidth - docEl.clientWidth}px`,
    ])
  }
  else {
    resetStyle($body, ['overflow', 'padding-right'])
  }
}

// 用于获取元素
export function querySelector<T extends HTMLElement = HTMLElement>(
  selector: string,
  $el: HTMLElement = docEl,
): T {
  return $el.querySelector(selector) as T
}

// inject style
export function injectStyle(css: string): void {
  if (!doc)
    return
  let $style = querySelector<HTMLStyleElement>(`#${cn('style')}`)

  if (!$style) {
    $style = newEl('style')
    $style.id = cn('style')
    document.head.append($style)
  }
  $style.innerHTML += css
}
