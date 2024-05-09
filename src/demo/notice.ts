import { notice } from '../main'
import { BtnBox, Button } from './utils'

function NormalNotice() {
  notice('this is a normal notice')
}

function BottomNotice() {
  notice('this is a notice at bottom', {
    bottom: true,
  })
}

function NoticeWithColor() {
  notice('this is a message with custom color', {
    background: 'red',
    color: 'white',
  })
}

const NoticeBtnBox = BtnBox(
  Button('Normal Notice', NormalNotice),
  Button('Bottom Notice', BottomNotice),
  Button('Notice with Background', NoticeWithColor),
)

export default NoticeBtnBox
