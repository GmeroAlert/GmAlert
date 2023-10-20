interface AlertType {
  open: () => Promise<void>
  close: () => Promise<void>
  $el: HTMLElement
}
