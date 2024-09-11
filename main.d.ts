declare module 'inline:*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}

declare module 'inline:*.scss' {
  const classes: string
  export default classes
}

/** 版本，默认编译会自动替换成package里的version */
declare const __VERSION__: string

declare const __IS_CLIENT__: boolean
