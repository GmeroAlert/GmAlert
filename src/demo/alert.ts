import { alert, message } from '../main'
import { newDiv, newEl } from '../utils/html'
import { BtnBox, Button } from './utils'

function NormalAlert() {
  alert('this is a normal alert')
}

function AlertWithContent() {
  alert('this is a alert with content,text', {
    content: 'content',
    text: 'text',
  })
}

function AlertWithButton() {
  alert('this is a alert with button', {
    text: '我们可以使用 beforeClose 来实现异步关闭或设置默认关闭行为，比如阻止点击遮罩关闭',
    cancelLabel: 'cancel',
    confirmLabel: 'confirm',
    beforeClose(status) {
      if (status === -3) {
        return false
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(status === 1)
        }, 1500)
      })
    },
  })
}

function AlertwithHtml() {
  const inputLabel = newDiv('gm-label')
  const span = newEl('span')
  span.textContent = '网站名称：'
  const input = newEl('input', 'gm-input')
  inputLabel.append(span, input)

  alert('this is a alert with html', {
    html: inputLabel,
    confirmLabel: '提交',
    beforeClose(status) {
      if (status === 1) {
        console.log('submit')
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true)
            if (input.value) {
              message(`我们收到了您的申请：${input.value}`)
            } else {
              message('您没有输入任何东西')
            }
          }, 1500)
        })
      }
      return true
    },
  })
}

function AlertWithImg() {
  const $img = newEl('img')
  $img.src = 'https://p.gmero.com/afdian-gmero-1.jpg'
  alert({
    confirmLabel: '',
    html: $img,
    className: ['alert-img'],
  })
}

const AlertBtnBox = BtnBox(
  Button('Normal Alert', NormalAlert),
  Button('Alert With Content', AlertWithContent),
  Button('Alert With Button', AlertWithButton),
  Button('Alert With Html', AlertwithHtml),
  Button('Alert With Img', AlertWithImg),
)

export default AlertBtnBox
