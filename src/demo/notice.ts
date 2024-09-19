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

function NoticeDynamic() {
  const inst = notice('this is a dynamic notice, will update in 1.5s')
  setTimeout(() => {
    inst.update({ timeout: 3000, content: 'notice updated!!!' })
  }, 1500)
}

const NoticeBtnBox = BtnBox(
  Button('Normal Notice', NormalNotice),
  Button('Bottom Notice', BottomNotice),
  Button('Notice with Background', NoticeWithColor),
  Button('Dynamic Notice', NoticeDynamic),
)

export default NoticeBtnBox
