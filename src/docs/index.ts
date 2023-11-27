import { alert, information, message, notice } from '../main'
import { newDiv } from '../utils/html'
import './index.scss'

const $root = document.querySelector('#root')

if (!$root) {
  throw new Error('Root element not found')
}

$root.innerHTML = ''

function Button(text: string, callback: () => void) {
  const button = document.createElement('button')
  button.classList.add('btn')
  button.textContent = text
  button.onclick = callback
  return button
}

function BtnBox(type: 'alert' | 'message' | 'notice' | 'information') {
  const btnBox = newDiv('btn-box')
  let core: any
  switch (type) {
    case 'alert':
      core = alert
      break
    case 'message':
      core = message
      break
    case 'notice':
      core = notice
      break
    case 'information':
      core = information
      break
    default:
      core = alert
  }

  let loadingFired = false

  btnBox.append(Button(`${type} success`, () => core('success')))
  btnBox.append(Button(`${type} error`, () => core('error', 'error')))
  btnBox.append(Button(`${type} warning`, () => core('warning', 'warning')))
  btnBox.append(Button(`${type} info`, () => core('info', 'info')))
  btnBox.append(
    Button(`${type} loading`, () => {
      if (loadingFired) {
        return
      }
      loadingFired = true
      const tmp = core({
        type: 'loading',
        content: 'loading',
        onClosed() {
          loadingFired = false
        },
      })
      setTimeout(
        () =>
          tmp.close().then(() => {
            message('load complete')
          }),
        2000,
      )
    }),
  )

  return btnBox
}

function Area(text: string) {
  const area = newDiv('area')
  const title = document.createElement('h3')
  title.textContent = text
  area.append(title)
  return area
}

const AlertArea = Area('Alert')
const alertBtnBox = BtnBox('alert')
const input = document.createElement('input')
alertBtnBox.append(
  Button('alert html', () => {
    alert({
      content: '输入点什么吧',
      type: 'info',
      html: input,
      showConfirm: true,
      hideClose: true,
      onClosed() {
        message(`${input.value ? `你输入了：${input.value}` : '你没有输入'}`)
        input.value = ''
      },
    })
  }),
)
AlertArea.append(alertBtnBox)
const MessageArea = Area('Message')
MessageArea.append(BtnBox('message'))
const NoticeArea = Area('Notice')
NoticeArea.append(BtnBox('notice'))
const InformationArea = Area('Information')
InformationArea.append(BtnBox('information'))

$root.append(
  Button('changeTheme', () => {
    document.documentElement.dataset.theme =
      document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
  }),
  AlertArea,
  MessageArea,
  NoticeArea,
  InformationArea,
)
