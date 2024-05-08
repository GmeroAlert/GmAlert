import { information } from '../main'
import { newDiv, newEl } from '../utils/html'

function Button(text: string, callback: () => void) {
  const button = newEl('button')
  button.classList.add('btn')
  button.textContent = text
  button.onclick = callback
  return button
}

export default function InformationBtnBox() {
  const btnBox = newDiv('btn-box')
  ;['success', 'error', 'warn', 'info', 'loading'].forEach((type: any) => {
    const tmp = Button(`Infomation ${type}`, () => {
      information({
        title: type,
        content: `This is a ${type} infomation`,
        type,
        headerLeft: 'headerLeft',
        headerRight: 'headerRight',
      })
    })

    btnBox.append(tmp)
  })

  return btnBox
}
