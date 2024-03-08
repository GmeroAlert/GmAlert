import type { MsgColor } from '../../modules/types'
import { cn, varName } from '../../utils/html'

const viewBox = (size: number) => `viewBox="0 0 ${size} ${size}"`

const styles = `style="width:1em;height:1em;vertical-align:baseline"`
const currentColor = 'currentColor'

const fill = `style="fill:${currentColor}"`
const strokeStyle =
  'stroke-linecap:round;stroke-linejoin:round;stroke-width:2px'
const stroke = `style="fill:none;stroke:${currentColor};${strokeStyle}"`

const circle = (c: string, cy = 12, r = 12) => {
  return `<circle cx="12" cy="${cy}" r="${r}" style="fill:${c}"/>`
}

const Svg = (inner: string, className = '', viweboxSize = 24) => {
  return `<svg class="${className}" ${viewBox(
    viweboxSize,
  )} ${styles}>${inner}</svg>`
}

const Path = (d: string, Attr: string) => `<path d="${d}" ${Attr}/>`

const SvgInfo = (c: string) => {
  return Svg(
    `${circle(c)}${Path(
      'M12,17.5a1,1,0,0,1-1-1v-5h-.5a1,1,0,0,1,0-2H12a1,1,0,0,1,1,1v6A1,1,0,0,1,12,17.5Z',
      fill,
    )}${Path('M14,18.5H10a1,1,0,0,1,0-2h4a1,1,0,0,1,0,2Z', fill)}${circle(
      currentColor,
      6,
      1.5,
    )}`,
  )
}

const SvgWarn = (c: string) => {
  return Svg(
    `${circle(c)}${Path(
      'M12,19.5A1.5,1.5,0,1,0,10.5,18,1.5,1.5,0,0,0,12,19.5Z',
      fill,
    )}${Path(
      'M12,14a1.5,1.5,0,0,1-1.5-1.5v-7a1.5,1.5,0,0,1,3,0v7A1.5,1.5,0,0,1,12,14Z',
      fill,
    )}`,
  )
}

const PathX = (trans = false) => {
  const transform = trans ? 'transform="translate(-4 -4)"' : ''
  const Attr = `${stroke} ${transform}`
  return `${Path('M16,8,8,16', Attr)}${Path('M8,8l8,8', Attr)}`
}

export const SvgClose = Svg(PathX(true), '', 16)

const SvgError = (c: string) => {
  return Svg(`${circle(c)}${PathX()}`)
}

const SvgSuccess = (c: string) => {
  return Svg(
    `${Path(
      'M12,1l3,2.1H18.8L20,6.5l3,2.1L21.83,12,23,15.4l-3,2.1L18.8,20.9H15L12,23,9,20.9H5.2L4,17.5,1,15.4,2.17,12,1,8.6,4,6.5,5.2,3.1H9Z',
      `style="fill:${c};stroke:${c};${strokeStyle}"`,
    )}${Path('M7.5,12l3,3,6-6', stroke)}`,
  )
}

const SvgLoading = (c: string) => {
  return Svg(
    `${Path(
      'M1,12A11,11,0,0,0,12,23h0A11,11,0,0,0,12,1',
      `style="fill:none;stroke:${c};${strokeStyle}"`,
    )}${Path(
      'M18.5,12A6.5,6.5,0,1,0,12,18.5h0',
      `style="fill:none;stroke:${c};${strokeStyle}"`,
    )}`,
    cn('spin'),
  )
}

export const svgLoad = SvgLoading(varName('loading'))

// info, warn, error, success, loading
const Icons = [SvgInfo, SvgWarn, SvgError, SvgSuccess, SvgLoading]

const types = ['info', 'warn', 'error', 'success', 'loading']

export function SvgIcon(type: MsgColor, className = '') {
  const index = types.indexOf(type)
  const svg = Icons[index] ?? ''
  return `<i class="${className}">${svg(varName(type))}</i>`
}
