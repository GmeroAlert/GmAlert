import styles from './icon.module.scss'
import { svgIcon } from './svgIcons'

export function SuccessIcon(dense = false, className = '') {
  return `<div class="${styles.icon} ${styles['success-icon']} ${
    dense ? styles['dense-icon'] : ''
  } ${className}"><div class="${styles['success-line']} ${
    styles['line-tip']
  }"></div><div class="${styles['success-line']} ${
    styles['line-long']
  }"></div><div class="${styles['success-ring-2']}"></div><div class="${
    styles['success-fix']
  }"></div></div>`
}

export function ErrorIcon(dense = false, className = '') {
  return `<div class="${styles.icon} ${styles['error-icon']} ${
    dense ? styles['dense-icon'] : ''
  } ${className}"><div class="${styles['error-ring']}"><div class="${
    styles['error-line-left']
  }"></div><div class="${styles['error-line-right']}"></div></div></div>`
}

export function WarnIcon(dense = false, className = '') {
  return `<div class="${styles.icon} ${styles['warn-icon']} ${
    dense ? styles['dense-icon'] : ''
  } ${className}"><div class="${styles['warn-content']}">!</div></div>`
}

export function InfoIcon(dense = false, className = '') {
  return `<div class="${styles.icon} ${styles['info-icon']} ${
    dense ? styles['dense-icon'] : ''
  } ${className}"><div class="${styles['info-content']}">i</div></div>`
}

export function LoadingIcon(dense = false, className = '') {
  const icon = svgIcon('loading')
  return `<div class="${styles.icon} ${styles['loading-icon']} ${
    dense ? styles['dense-icon'] : ''
  } ${className}">${icon}</div>`
}
