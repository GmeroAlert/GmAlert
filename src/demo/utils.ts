import { newDiv } from '../utils/html'

export function Button(text: string, callback: () => void) {
  const button = document.createElement('button')
  button.classList.add('btn')
  button.textContent = text
  button.onclick = callback
  return button
}

export function BtnBox(...el: HTMLElement[]) {
  const btnBox = newDiv('btn-box')
  btnBox.append(...el)
  return btnBox
}
