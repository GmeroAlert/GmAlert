import {
  ErrorIcon,
  InfoIcon,
  LoadingIcon,
  SuccessIcon,
  WarnIcon,
} from './animatedIcons'
import { svgIcon } from './svgIcons'

export function AnimatedIcon(
  name: 'success' | 'error' | 'warning' | 'info' | 'loading',
  dense = false,
  className?: string,
) {
  switch (name) {
    case 'success':
      return SuccessIcon(dense, className)
    case 'error':
      return ErrorIcon(dense, className)
    case 'warning':
      return WarnIcon(dense, className)
    case 'info':
      return InfoIcon(dense, className)
    case 'loading':
      return LoadingIcon(dense, className)
    default:
      return SuccessIcon(dense, className)
  }
}

export function SvgIcon(
  name: 'success' | 'error' | 'warning' | 'info' | 'loading' | 'close',
  className?: string,
) {
  return svgIcon(name, className)
}
