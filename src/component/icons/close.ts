export function CloseIcon(className = '') {
  const styles = `style="cursor:pointer;transition:all 0.2s"`
  return `<i class="${className}" ${styles}><svg viewBox="0 0 24 24" width="1em" height="1em"><path d="M1.5,1.5l21,21" style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px"/><path d="M1.5,22.5l21-21" style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px"/></svg></i>`
}
