import styles from 'inline:./index.scss'
import { notice } from '../main'
import { injectStyle, newDiv, querySelector } from '../utils/html'

import AlertBtnBox from './alert'
import MsgBtnBox from './message'
import NoticeBtnBox from './notice'

injectStyle(styles)

notice.config({ timeout: 5000 })

const $root = querySelector('#root')

if (!$root) {
  throw new Error('Root element not found')
}

$root.innerHTML = ''

function Area(text: string) {
  const area = newDiv('area')
  const title = document.createElement('h3')
  title.textContent = text
  area.append(title)
  return area
}

const AlertArea = Area('Alert')
AlertArea.append(AlertBtnBox)

const MessageArea = Area('Message')
MessageArea.append(MsgBtnBox)

const NoticeArea = Area('Notice')
NoticeArea.append(NoticeBtnBox)

$root.append(
  AlertArea,
  MessageArea,
  NoticeArea,
)
