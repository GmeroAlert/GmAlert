import GmMessage from '../../component/message'
import GmNotice from '../../component/notice'
import styles from '../../main.module.scss'
import { newDiv } from '../../utils/html'
import type { Gmsg as GmsgType } from '../Gmsg'
import type { Setting, UserSetting } from '../utils'
import { assignConfig, getDefaultConf } from '../utils'

const DEFAULTS = getDefaultConf()

/**
 * 单个msg实例类
 */
export class Msg {
  // 当前msg的配置
  settings: Setting

  // 存储在map中的key
  id: number

  timeout: number

  private $elem: HTMLElement

  count: number

  private progress: number

  private Gmsg: GmsgType

  private inst: AlertType

  private timer?: NodeJS.Timeout

  constructor(Gmsg: GmsgType, opts: UserSetting) {
    this.Gmsg = Gmsg
    this.settings = assignConfig(DEFAULTS, opts)
    this.id = Gmsg.instCount
    this.count = 1
    const { timeout } = this.settings
    this.timeout = timeout
    this.progress = 1
    this.settings.timeout = timeout

    if (Gmsg.form === 'msg') {
      this.inst = GmMessage({
        text: this.settings.content,
        type: this.settings.type,
      })
    } else {
      this.inst = GmNotice({
        text: this.settings.content,
        type: this.settings.type,
      })
    }

    this.inst.open()
    this.$elem = this.inst.$el

    this.setTimeOut()
  }

  // 设置定时
  private setTimeOut() {
    if (!this.timeout) return

    this.setProgress(false, true)

    this.timer = setInterval(() => {
      if (this.getProgress() === 0) {
        this.close()
        clearInterval(this.timer)
      }
    }, 150)

    this.$elem.addEventListener('mouseenter', () => {
      this.setProgress(true)
    })

    this.$elem.addEventListener('mouseleave', () => {
      this.setProgress()
    })
  }

  // 设置进度
  private setProgress(pause = false, reset = false) {
    if (!this.timeout) return
    let $progress = this.$elem.querySelector(
      `.${styles['gmsg-progress']}`,
    ) as HTMLElement
    let $progressBar = this.$elem.querySelector(
      `.${styles['gmsg-progress-bar']}`,
    ) as HTMLElement
    if (!$progress || !$progressBar) {
      $progress = newDiv(styles['gmsg-progress'])
      $progressBar = newDiv(styles['gmsg-progress-bar'])
      $progress.append($progressBar)
      this.$elem.append($progress)
    }
    this.progress = reset ? 1 : this.getProgress()

    if (reset) {
      $progressBar.style.width = `${this.progress * 100}%`
      $progressBar.style.transition = 'none'
    }

    if (pause) {
      setTimeout(() => {
        $progressBar.style.width = `${this.progress * 100}%`
        $progressBar.style.transition = 'none'
      }, 10)
    } else {
      setTimeout(() => {
        $progressBar.style.width = '0%'
        $progressBar.style.transition = `width ${
          this.timeout * this.progress
        }ms linear`
      }, 10)
    }
  }

  // 获取进度
  private getProgress() {
    if (!this.timeout) return 0
    const $progress = this.$elem.querySelector(
      `.${styles['gmsg-progress']}`,
    ) as HTMLElement
    const $progressBar = this.$elem.querySelector(
      `.${styles['gmsg-progress-bar']}`,
    ) as HTMLElement

    this.progress = $progressBar.clientWidth / $progress.clientWidth

    return this.progress
  }

  /**
   * 设置消息数量统计
   *
   */
  setMsgCount() {
    const countClassName = styles['gmsg-count']
    let $count = this.$elem.querySelector(`.${countClassName}`) as HTMLElement
    if (!$count) {
      $count = document.createElement('span')
      $count.classList.add(countClassName)

      this.$elem.append($count)
    }
    $count.innerHTML = this.count.toString()
    $count.style.animationName = ''
    setTimeout(() => {
      $count.style.animationName = styles['message-shake']
    }, 50)

    this.timer && clearInterval(this.timer)
    this.setTimeOut()
  }

  /**
   * 直接销毁元素，不会触发关闭回调函数
   */
  destroy() {
    this.inst.close().then(() => {
      this.Gmsg.remove(this.id)
    })
  }

  async close() {
    await this.inst.close().then(() => {
      this.Gmsg.remove(this.id)
      if (this.settings.onClose) {
        this.settings.onClose()
      }
    })
  }
}
