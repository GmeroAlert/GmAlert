export interface UserSetting {
  type?: 'info' | 'warning' | 'success' | 'error' | 'loading'
  timeout?: number
  content?: string
  onClose?: (() => void) | null
  maxNums?: number
}

// 单个msg的实例设置项
export interface Setting {
  type: 'info' | 'warning' | 'success' | 'error' | 'loading'
  timeout: number
  content: string
  onClose: (() => void) | null
  maxNums: number
}

// 浅拷贝
export function copyConfig(mainConfig: Setting) {
  const tmp = { ...mainConfig }
  return tmp
}

export function assignConfig(mainConfig: Setting, userConfig: UserSetting) {
  return Object.assign(copyConfig(mainConfig), userConfig)
}

/**
 * 全局默认配置
 * 可在引入js之前通过Gmsg_GLOBALS.DEFAULTS进行配置
 * type {String} 类型，支持'info','warning','success','error','loading'
 * showClose {Boolean} 是否显示关闭图标，默认为false不显示
 * timeout {Number} 多久后自动关闭，单位ms,默认2500
 * autoClose {Boolean} 是否自动关闭，默认true,注意在type为loading的时候自动关闭为false
 * content {String} 提示的内容
 * onClose {Function} 关闭的回调函数
 */
const DEFAULTS: Setting = {
  type: 'info',
  timeout: 2500,
  content: '',
  onClose: null,
  maxNums: 5,
}

export function getDefaultConf() {
  return copyConfig(DEFAULTS)
}
