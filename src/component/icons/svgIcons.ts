import styles from './svgicon.module.scss'

export const ICONS = new Map([
  [
    'info',
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" style="fill:#29abe2"/><circle cx="12" cy="6.25" r="1.5" style="fill:#fff"/><path d="M16,22.6a1.15,1.15,0,0,1-1.15-1.15V15.7H14.5a1.15,1.15,0,0,1,0-2.3H16a1.14,1.14,0,0,1,1.15,1.15v6.9A1.15,1.15,0,0,1,16,22.6Z" transform="translate(-4 -4)" style="fill:#fff"/><path d="M18,23.1H14a1.1,1.1,0,1,1,0-2.2h4a1.1,1.1,0,0,1,0,2.2Z" transform="translate(-4 -4)" style="fill:#fff"/></svg>`,
  ],
  [
    'warning',
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" style="fill:#faad14"/><path d="M12,19.5A1.5,1.5,0,1,0,10.5,18,1.5,1.5,0,0,0,12,19.5Z" style="fill:#fff;fill-rule:evenodd"/><path d="M12,14a1.5,1.5,0,0,1-1.5-1.5v-7a1.5,1.5,0,0,1,3,0v7A1.5,1.5,0,0,1,12,14Z" style="fill:#fff"/></svg>`,
  ],
  [
    'error',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,24.06a12,12,0,1,0-12-12A12,12,0,0,0,12,24.06Z" transform="translate(0.01 -0.06)" style="fill:#f5222d"/><path d="M16.17,7.83,7.83,16.17" transform="translate(0.01 -0.06)" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.799999952316284px"/><path d="M7.83,7.83l8.34,8.34" transform="translate(0.01 -0.06)" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.799999952316284px"/></svg>',
  ],
  [
    'success',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,.5l3.18,2.2h3.93l1.21,3.55,3.18,2.2L22.28,12l1.22,3.55-3.18,2.2L19.11,21.3H15.18L12,23.5,8.82,21.3H4.89L3.68,17.75.5,15.55,1.72,12,.5,8.45l3.18-2.2L4.89,2.7H8.82Z" style="fill:#52c41a;stroke:#52c41a;stroke-linecap:round;stroke-linejoin:round"/><path d="M7.23,12l3.18,3L16.77,9" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg>',
  ],
  [
    'loading',
    `<svg class="${styles['animate-turn']}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M1,12.06a11,11,0,0,0,11,11h0a11,11,0,0,0,0-22" transform="translate(0.01 -0.06)" style="fill:none;stroke:#1890ff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><path d="M18.59,12.06a6.6,6.6,0,1,0-6.6,6.6h0" transform="translate(0.01 -0.06)" style="fill:none;stroke:#1890ff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg>`,
  ],
  [
    'close',
    '<svg width="1em" height="1em" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M14 14L34 34" stroke="#909399" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 34L34 14" stroke="#909399" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  ],
])

export function svgIcon(
  name: 'info' | 'warning' | 'error' | 'success' | 'loading' | 'info' | 'close',
  className = '',
) {
  return `<i class="${styles.icon} ${className}">${ICONS.get(name)}</i>`
}
