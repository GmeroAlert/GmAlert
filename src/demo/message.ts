import { message } from '../main'
import { BtnBox, Button } from './utils'

function NormalMessage() {
  message('this is a normal message')
}

function MsgWithIcon() {
  message('this is a message with icon', {
    icon: 'loading',
  })
}

const MsgBtnBox = BtnBox(
  Button('Normal Message', NormalMessage),
  Button('Message with Icon', MsgWithIcon),
)

export default MsgBtnBox
