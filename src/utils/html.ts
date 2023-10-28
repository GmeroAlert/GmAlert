import styles from '../main.module.scss'
import { changeAnimation } from './animateHandle'

export function newDiv(...className: string[]) {
  const $div = document.createElement('div')
  $div.classList.add(...className)
  return $div
}

export function setMsgCount($el: HTMLElement, count: number) {
  const countClassName = styles['gmsg-count']
  let $count = $el.querySelector(`.${countClassName}`) as HTMLElement
  if (!$count) {
    $count = document.createElement('span')
    $count.classList.add(countClassName)

    $el.append($count)
  }
  $count.innerHTML = `${count > 99 ? '99' : count}`
  changeAnimation($count, '')
  setTimeout(() => {
    changeAnimation($count, styles.shake)
  })
}

const getContainer = () => {
  let $root = document.querySelector<HTMLElement>(
    `.${styles['gmsg-container']}`,
  )

  if (!$root) {
    $root = newDiv(styles['gmsg-container'], 'gmalert-global-vars')
    document.body.append($root)
  }

  return $root
}

const getMessageContainer = () => {
  let $root = document.querySelector<HTMLElement>(
    `.${styles['gmsg-message-container']}`,
  )
  if ($root) return $root
  $root = newDiv(styles['gmsg-message-container'])
  getContainer().append($root)
  return $root
}

const getNoticeContainer = () => {
  let $wrapper = document.querySelector<HTMLElement>(
    `.${styles['gmsg-notice-container']}`,
  )
  if ($wrapper) return $wrapper
  $wrapper = newDiv(styles['gmsg-notice-container'])
  getContainer().append($wrapper)

  return $wrapper
}

// 0: message | 1: notice | 2: alert
export const getRoot = (type: 0 | 1 | 2) => {
  switch (type) {
    case 0:
      return getMessageContainer()
    case 1:
      return getNoticeContainer()
    case 2:
      return getContainer()
  }
}

// 用于修改样式的工具类，并且可以减少回流重绘，后面代码中会频繁用到
export function changeStyle(el: HTMLElement, arr: string[]): void {
  const original = el.style.cssText.split(';')
  original.pop()

  el.style.cssText = `${original.concat(arr).join(';')};`
}
