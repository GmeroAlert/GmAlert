import styles from './svgicon.module.scss'

// info, warning, error, success, loading, close
const Icons = [
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" style="fill:#29abe2"/><path d="M12,17.5a1,1,0,0,1-1-1v-5h-.5a1,1,0,0,1,0-2H12a1,1,0,0,1,1,1v6A1,1,0,0,1,12,17.5Z" style="fill:#fff"/><path d="M14,18.5H10a1,1,0,0,1,0-2h4a1,1,0,0,1,0,2Z" style="fill:#fff"/><circle cx="12" cy="6" r="1.5" style="fill:#fff"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" style="fill:#faad14"/><path d="M12,19.5A1.5,1.5,0,1,0,10.5,18,1.5,1.5,0,0,0,12,19.5Z" style="fill:#fff;fill-rule:evenodd"/><path d="M12,14a1.5,1.5,0,0,1-1.5-1.5v-7a1.5,1.5,0,0,1,3,0v7A1.5,1.5,0,0,1,12,14Z" style="fill:#fff"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" style="fill:#f5222d"/><path d="M16.5,7.5l-9,9" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px"/><path d="M7.5,7.5l9,9" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px"/></svg>`,
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,.5l3.18,2.2h3.93l1.21,3.55,3.18,2.2L22.28,12l1.22,3.55-3.18,2.2L19.11,21.3H15.18L12,23.5,8.82,21.3H4.89L3.68,17.75.5,15.55,1.72,12,.5,8.45l3.18-2.2L4.89,2.7H8.82Z" style="fill:#52c41a;stroke:#52c41a;stroke-linecap:round;stroke-linejoin:round"/><path d="M7.5,12l3,3,6-6" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg>',
  `<svg class="${styles['animate-turn']}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M1,12A11,11,0,0,0,12,23h0A11,11,0,0,0,12,1" style="fill:none;stroke:#1890ff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><path d="M18.5,12A6.5,6.5,0,1,0,12,18.5h0" style="fill:none;stroke:#1890ff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg>`,
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2,2,22,22" style="fill:none;stroke:#909399;stroke-linecap:round;stroke-linejoin:round;stroke-width:4px"/><path d="M2,22,22,2" style="fill:none;stroke:#909399;stroke-linecap:round;stroke-linejoin:round;stroke-width:4px"/></svg>',
]

export function svgIcon(index: number, className = '') {
  return `<i class="${styles.icon} ${className}">${Icons[index]}</i>`
}
