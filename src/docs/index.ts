import { alert, information, message, notice } from '../main'

const $root = document.querySelector('#root')

if (!$root) {
  throw new Error('Root element not found')
}

$root.innerHTML = ''

function createButton(text: string, callback: () => void) {
  const button = document.createElement('button')
  button.textContent = text
  button.onclick = callback
  return button
}

$root.append(createButton('Alert', () => alert('Alert')))
$root.append(createButton('Message', () => message('Message')))
$root.append(createButton('Notice', () => notice('Notice')))
$root.append(createButton('Information', () => information('Information')))
