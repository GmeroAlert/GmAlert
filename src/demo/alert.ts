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
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true)
            if (input.value) {
              message(`我们收到了您的申请：${input.value}`)
            }
            else {
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
  $img.src = '/afdian.jpg'
  alert({
    confirmLabel: '',
    html: $img,
    className: ['alert-img'],
  })
}

function AlertDynamic() {
  let count = 0
  const inst = alert('this is a alert with dynamic content', {
    content: 'count: 0',
    beforeClose(status) {
      if (status === 1) {
        return new Promise((resolve) => {
          setTimeout(() => {
            count += 1
            inst.update({ content: `count: ${count}`, confirmLabel: '继续' })
            resolve(false)
          }, 1000)
        })
      }
      return true
    },
  })
}

function AlertOnlyoneCanLive() {
  alert('只能同时存在一个 alert', {
    confirmLabel: '打开另一个dialog',
    beforeClose(status) {
      if (status === 1) {
        alert('这是另一个dialog', {
          confirmLabel: '关闭',
        })
        return false
      }
      return true
    },
  })
}

const AlertBtnBox = BtnBox(
  Button('Normal Alert', NormalAlert),
  Button('Alert With Content', AlertWithContent),
  Button('Alert With Button', AlertWithButton),
  Button('Alert With Html', AlertwithHtml),
  Button('Alert With Img', AlertWithImg),
  Button('Alert Dynamic', AlertDynamic),
  Button('Alert Onlyone Can Live', AlertOnlyoneCanLive),
)

export default AlertBtnBox
