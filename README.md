# GmAlert 一个简单易用的 JS 弹出消息插件

- 使用 typescript 构建，原生 js 让你更轻松的融合进你自己的项目
- 支持 4 种消息类型，包括 notice、message、alert、infomation
- 每种消息类型支持多种样式，error、success、warn、info、loading
- 样式可自定义
- 轻量级，js + css 不到 18kb(没有使用 gzip 压缩)

DEMO: <https://gmeroalert.github.io/GmAlert/> (DEMO 展示的是 main 分支开发版本，可能跟 release 版本有区别)

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

> 对于 -buddle.js 文件，这是一个内嵌了 css 的文件，您只需要引入该 js 文件就可以使用了

## 使用

我们将消息提示，分为四个模块：message, notice, alert, information，每个模块的效果与一些逻辑是不同的。比如，message 和 notice 每个页面可以同时存在多个实例，而 alert 跟 information 只能同时拥有一个实例，发起新的实例会强制关闭页面中已经存在的实例。

所有的模块调用都会返回该消息示例，让您能够控制它的关闭，但我们希望您只在使用 loading 时使用该实例，因为其他情况都是可以自动关闭或者使用关闭按钮进行关闭。

它们的调用方式类似，都是通过 Gmal.模块([message], [type?], [option?]) 进行调用，比如：Gmal.message("这是一条消息")

以下是它们的可选参数和配置项

### message

气泡消息模块，触发后显示在中间，比较小巧，适合一些简单的消息提示

```typescript
type?: 'success' | 'error' | 'warn' | 'info' | 'loading'

option?: {
 timeout?: number // 消失的时间
 // 关闭后的回调
 // @param status 0: 用户点击关闭或取消按钮, 1: 用户点确认, -1: 超时自动关闭,
 // -2 | undefined : 被强制关闭，一般是因为超出了maxCount
 onClosed?: (status: number) => void
}

// 全局配置
Gmal.message.config({
 timeout: number // 设置默认时间
 maxCount: number // 设置最大实例个数
})
```

### notice

滑入提示模块，触发后显示在右上角，比较显眼，适合一些重要的消息提示

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

弹窗组件，触发后显示在中间，适合一些需要用户确认的消息提示，可以显示较为丰富的内容，甚至是 html。不允许同时存在多个该实例，会自动关闭之前的实例

```typescript
type?: 'success' | 'error' | 'warn' | 'info' | 'loading'

option?: {
 timeout?: number // 消失的时间
 text?: string // 附加消息，如果设置了 html 该项将被忽略
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
 // mask显示
 hideMask?: boolean
}
```

### information

右下角信息提示组件，适合一些通知类的消息，比如公告，一些信息的轮播等。不允许同时存在多个该实例，会自动关闭之前的实例

```typescript
type?: 'success' | 'error' | 'warn' | 'info' | 'loading'

option?: {
 timeout?: number // 消失的时间
 title?: string // 头部的标题
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
