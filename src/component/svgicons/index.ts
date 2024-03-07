import type { MsgColor } from '../../modules/types'
import { cn, varName } from '../../utils/html'

const viewBox = `viewBox="0 0 24 24"`

const styles = `style="width:1em;height:1em;vertical-align:baseline"`

const fill = 'style="fill:#fff"'
const strokeStyle =
  'stroke-linecap:round;stroke-linejoin:round;stroke-width:2px'
const stroke = `style="fill:none;stroke:#fff;${strokeStyle}"`

export const svgLoading = `<svg class="${cn(
  'ani-turn',
)}" ${viewBox} ${styles}><path d="M1,12A11,11,0,0,0,12,23h0A11,11,0,0,0,12,1" style="fill:none;stroke:${varName(
  'loading',
)};${strokeStyle}"/><path d="M18.5,12A6.5,6.5,0,1,0,12,18.5h0" style="fill:none;stroke:${varName(
  'loading',
)};${strokeStyle}"/></svg>`

const circle = (c: string) => {
  return `<circle cx="12" cy="12" r="12" style="fill:${varName(c)}"/>`
}

const Svg = (inner: string) => {
  return `<svg ${viewBox} ${styles}>${inner}</svg>`
}

// info, warn, error, success, loading
const Icons = [
  Svg(
    `${circle(
      'info',
    )}<path d="M12,17.5a1,1,0,0,1-1-1v-5h-.5a1,1,0,0,1,0-2H12a1,1,0,0,1,1,1v6A1,1,0,0,1,12,17.5Z" ${fill}/><path d="M14,18.5H10a1,1,0,0,1,0-2h4a1,1,0,0,1,0,2Z" ${fill}/><circle cx="12" cy="6" r="1.5" ${fill}/>`,
  ),
  Svg(
    `${circle(
      'warn',
    )}<path d="M12,19.5A1.5,1.5,0,1,0,10.5,18,1.5,1.5,0,0,0,12,19.5Z" style="fill:#fff;fill-rule:evenodd"/><path d="M12,14a1.5,1.5,0,0,1-1.5-1.5v-7a1.5,1.5,0,0,1,3,0v7A1.5,1.5,0,0,1,12,14Z" ${fill}/>`,
  ),
  Svg(
    `${circle(
      'error',
    )}<path d="M16,8,8,16" ${stroke}/><path d="M8,8l8,8" ${stroke}/>`,
  ),
  Svg(
    `<path d="M12,.5l3.18,2.2h3.93l1.21,3.55,3.18,2.2L22.28,12l1.22,3.55-3.18,2.2L19.11,21.3H15.18L12,23.5,8.82,21.3H4.89L3.68,17.75.5,15.55,1.72,12,.5,8.45l3.18-2.2L4.89,2.7H8.82Z" style="fill:${varName(
      'success',
    )};stroke:${varName(
      'success',
    )};stroke-linecap:round;stroke-linejoin:round"/><path d="M7.5,12l3,3,6-6" ${stroke}/>`,
  ),
  svgLoading,
]

const types = ['info', 'warn', 'error', 'success', 'loading']

export function SvgIcon(type: MsgColor, className = '') {
  const index = types.indexOf(type)
  const svg = Icons[index] ?? ''
  return `<i class="${className}">${svg}</i>`
}
