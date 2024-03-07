import type { MsgColor } from '../../modules/types'
import { cn } from '../../utils/html'
import { svgLoading } from '../svgicons'

import '../../styles/animatedIcons.scss'

function baseCn(dense: boolean, className: string, extClassName: string) {
  return `class="${cn('aniicon')} ${cn(className)} ${
    dense ? cn('dense') : ''
  } ${extClassName}"`
}

const border = `<div class="${cn('ani-wrap')}"></div>`

function SuccessIcon(dense = false, className = '') {
  return `<div ${baseCn(dense, 'ok-icon', className)}>${border}<div class="${cn(
    'ok-line',
  )} ${cn('line-tip')}"></div><div class="${cn('ok-line')} ${cn(
    'line-long',
  )}"></div><div class="${cn('ok-ring')}"></div></div>`
}

function ErrorIcon(dense = false, className = '') {
  return `<div ${baseCn(
    dense,
    'err-icon',
    className,
  )}>${border}<div class="${cn('err-r')}"><div class="${cn(
    'err-ll',
  )}"></div><div class="${cn('err-lr')}"></div></div></div>`
}

function WarnIcon(dense = false, className = '') {
  return `<div ${baseCn(
    dense,
    'warn-icon',
    className,
  )}>${border}<div class="${cn('warn-content')}">!</div></div>`
}

function InfoIcon(dense = false, className = '') {
  return `<div ${baseCn(
    dense,
    'info-icon',
    className,
  )}>${border}<div class="${cn('info-content')}">i</div></div>`
}

function LoadingIcon(dense = false, className = '') {
  return `<div ${baseCn(dense, 'load-icon', className)}>${svgLoading}</div>`
}

export function AnimatedIcon(type: MsgColor, dense = false, className = '') {
  switch (type) {
    case 'success':
      return SuccessIcon(dense, className)
    case 'error':
      return ErrorIcon(dense, className)
    case 'warn':
      return WarnIcon(dense, className)
    case 'info':
      return InfoIcon(dense, className)
    case 'loading':
      return LoadingIcon(dense, className)
    default:
      return ''
  }
}
