import { cn, newEl } from '../../utils/html'

export function CloseIcon() {
  const innerHTML = `×`
  const $i = newEl('i', cn('close'))
  $i.innerHTML = innerHTML
  return $i
}
