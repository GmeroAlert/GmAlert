import { cn, newEl } from '../../utils/html'

const SvgClose = `<svg viewBox="0 0 16 16"><circle cx="12" cy="12" r="12" style="fill:#e06968"/><path d="M16,8,8,16" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><path d="M8,8l8,8" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg>`

export function CloseIcon() {
  const $i = newEl('i', cn('close'))
  $i.innerHTML = SvgClose
  return $i
}
