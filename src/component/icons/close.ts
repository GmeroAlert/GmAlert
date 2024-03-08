import { cn, newEl } from '../../utils/html'
import { SvgClose } from '../svgicons'

export function CloseIcon() {
  const $i = newEl('i', cn('close'))
  $i.innerHTML = SvgClose
  return $i
}
