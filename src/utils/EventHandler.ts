const EventHandler = {
  on<K extends keyof HTMLElementEventMap>(
    element: HTMLElement,
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions | undefined,
  ) {
    element.addEventListener(type, listener, options)
  },

  off(
    element: HTMLElement,
    type: keyof HTMLElementEventMap,
    callback: (e: Event) => void,
  ) {
    element.removeEventListener(type, callback)
  },
}

export default EventHandler
