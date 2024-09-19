import { message } from '../main'
import { BtnBox, Button } from './utils'

function SpinIcon(size = '1em') {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24"><g stroke="currentColor"><circle cx="12" cy="12" r="9.5" fill="none" stroke-linecap="round" stroke-width="2"><animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0 150;42 150;42 150;42 150"/><animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0;-16;-59;-59"/></circle><animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></g></svg>`
}

function NormalMessage() {
  message('this is a normal message')
}

function MsgWithIcon() {
  message('this is a message with icon', {
    icon: SpinIcon('1.4em'),
  })
}

function MsgDynamic() {
  const msg = message('this is a dynamic message')
  setTimeout(() => {
    msg.update({
      content: 'this is a dynamic message updated',
    })
  }, 1000)
}

const MsgBtnBox = BtnBox(
  Button('Normal Message', NormalMessage),
  Button('Message with Icon', MsgWithIcon),
  Button('Dynamic Message', MsgDynamic),
)

export default MsgBtnBox
