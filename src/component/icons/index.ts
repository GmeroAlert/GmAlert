import {
  ErrorIcon,
  InfoIcon,
  LoadingIcon,
  SuccessIcon,
  WarnIcon,
} from './animatedIcons'
import { svgIcon } from './svgIcons'

const iconSets = ['info', 'warning', 'error', 'success', 'loading', 'close']

// info, warning, error, success, loading
export function AnimatedIcon(
  type?: 'info' | 'warning' | 'error' | 'success' | 'loading',
  dense = false,
  className?: string,
) {
  switch (type) {
    case iconSets[3]:
      return SuccessIcon(dense, className)
    case iconSets[2]:
      return ErrorIcon(dense, className)
    case iconSets[1]:
      return WarnIcon(dense, className)
    case iconSets[0]:
      return InfoIcon(dense, className)
    case iconSets[4]:
      return LoadingIcon(dense, className)
    default:
      return SuccessIcon(dense, className)
  }
}

// info, warning, error, success, loading, close
export function SvgIcon(
  type?: 'info' | 'warning' | 'error' | 'success' | 'loading' | 'close',
  className?: string,
) {
  return svgIcon(iconSets.indexOf(type || 'success'), className)
}
