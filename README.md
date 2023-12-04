# GmAlert 一个简单易用的 JS 弹出消息插件

- 使用 typescript 构建，原生 js 让你更轻松的融合进你自己的项目
- 支持 4 种消息类型，包括 notice、message、alert、infomation
- 每种消息类型支持多种样式，error、success、warn、info、loading
- 轻量级，js + css 仅仅 20kb(没有使用 gzip 压缩)

文档: <https://gmeroalert.github.io/>

## 安装

请到[Releases · g-mero/GmAlert (github.com)](https://github.com/GmeroAlert/GmAlert/releases)页面下载最新的编译后文件(.css 与.js)

在您的网站中引入这两个文件, 比如:

```html
<html lang="en">
  <head>
    ...
    <link rel="stylesheet" href="/css/gmalert.min.css" />
  </head>
  <body>
    ...
    <script src="/js/gmalert.min.js"></script>
  </body>
</html>
```

## 使用

我们将消息提示，分为四个模块：message, notice, alert, information，每个模块的效果与一些逻辑是不同的。比如，message 和 notice 每个页面可以同时存在多个实例，而 alert 跟 information 只能同时拥有一个实例，发起新的实例会强制关闭页面中已经存在的实例。

它们的调用方式类似，都是通过 Gmal.模块([message], [type?], [option?]) 进行调用，比如：Gmal.message("这是一条消息")

以下是它们的可选参数和配置项

### message

```typescript
type?: 'success' | 'error' | 'warn' | 'info' | 'loading'

option?: {
 timeout?: number // 消失的时间
 // 关闭后的回调
 // @param status 0: 用户点击关闭或取消按钮, 1: 用户点确认, -1: 超时自动关闭,
 // -2 | undefined : 被强制关闭，一般是因为超出了maxCount
 onClosed?: (status: number) => void
}

Gmal.message.config({
 timeout: number // 设置默认时间
 maxCount: number // 设置最大实例个数
})
```

### notice

```typescript
type?: 'success' | 'error' | 'warn' | 'info' | 'loading'

option?: {
 timeout?: number // 消失的时间
 // 关闭后的回调
 // @param status -1: 超时自动关闭, -2 | undefined : 被强制关闭，一般是因为超出了maxCount
 onClosed?: (status: number) => void
}

Gmal.notice.config({
 timeout: number // 设置默认消失时间
 maxCount: number // 设置最大实例个数
})
```

### alert

```typescript
type?: 'success' | 'error' | 'warn' | 'info' | 'loading'

option?: {
 timeout?: number // 消失的时间
 text?: string // 附加消息
 // 关闭后的回调
 // @param status 0: 用户点击关闭或取消按钮, 1: 用户点确认, -1: 超时自动关闭,
 // -2 | undefined : 被强制关闭，一般是因为超出了maxCount
 onClosed?: (status: number) => void
 // 显示关闭按钮
 hideClose?: boolean
 // 显示确认按钮
 showConfirm?: boolean
 // 显示取消按钮
 showCancel?: boolean
 // html
 html?: string | HTMLElement
}
```

### information

```typescript
type?: 'success' | 'error' | 'warn' | 'info' | 'loading'

option?: {
 timeout?: number // 消失的时间
 headerLeft?: string // 头部左侧的文本，一般是消息的标题
 headerRight?: string // 头部右侧的文本，一般是时间等信息
 // 关闭后的回调
 // @param status 0: 用户点击关闭或取消按钮, 1: 用户点确认, -1: 超时自动关闭,
 // -2 | undefined : 被强制关闭，一般是因为超出了maxCount
 onClosed?: (status: number) => void
 // 显示关闭按钮
 hideClose?: boolean
}

Gmal.information.config({
 timeout: number // 设置默认的消失时间
})
```
