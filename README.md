# Gmalert 2

无依赖，轻量的消息反馈组件，内置三个模块：alert (对话框、模态框)、message (toast)、notice (上下滑入提示)，支持自定义颜色、图标、内容等

前端反馈组件对于一个成熟的网站系统来说时不和或缺的，现在各种 UI 组件库都会继承自己的反馈组件，但是无关框架的基于原生 js 的反馈组件却很难寻找，正是这样的原因，我开发了 Gmalert (Gm 是我的网名 Gmero 的前两位字母，alert 代表其反馈提醒的功能)

Gmalert 的 v1 版本经过一段时间的开发，基本功能已经完成，体积也成功控制在了 18kb 左右，但在实际应用过程中发现，手机端的表现不如人意，这也是一些用户所反馈的问题。因此 v2 版本的开发目标便转移到了移动端优化的路线上，移除了使用频率不高的 Information 模块，样式进行了大改，移除了原本的 error、success、warn 等的样式预设，进一步化繁为简，将颜色、图标等的自定义交由用户处理，这也使得 Gmalert v2 版本的体积控制在了 10kb 以内

[DEMO 演示](https://gmeroalert.github.io/GmAlert)

## 特性介绍

**轻量的体积**，“轻”一直是本项目的核心设计目标，v2 版本在前版本的基础上再将体积缩小了一倍，不过 10kb 的体积，gzip 压缩后甚至只有 3.9kb 的大小

**完善的功能**，Gmalert 2 通过其内置的 3 大模块发挥功能，分别是 alert (弹出自带模态的确认框、自定义内容的对话框、可以异步关闭的表单提交框)、message (小巧的消息弹出组件，适合简单的消息)、notice (由顶部或底部滑入的消息提示，醒目，方便，而且可以轻松自定义颜色)。这 3 个模块几乎可以满足所有的消息反馈需求，并且其定制能力非常强大，比如本站的搜索面板就是基于 alert 模块的自定义 html 功能实现的

**轻松使用**，无需单独引入 CSS 文件，一个 JS 文件就搞定！样式表写入在 JS 代码中，会在程序运行时自动附加到 head。你也可以使用 NPM 上的 esm 版本的 Gmalert，支持 tree-shake ，按需引入你需要的组件

## 快速使用

在 [Releases · GmeroAlert/GmAlert (github.com)](https://github.com/GmeroAlert/GmAlert/releases) 页面下载最新的资源文件（**gmalert.min.js**），然后在你的网页中引入即可：

```html
<body>
  <script src="path/to/gmalert.min.js"></script>
</body>
```

然后赶紧使用起来吧

```javascript
Gmal.alert('这是一个弹窗')

Gmal.message('3s中后我就消失了', 3000)

Gmal.message('我内置了一个loading的图标', {
  icon: 'loading', // 其他图标请输入 html 代码
  timeout: 0, // 设为0就只能手动关闭了
})

Gmal.notice('你应该是对的', {
  background: 'red',
  color: '#fff',
})
```

## NPM 使用

获取你想通过 NPM 来使用 Gmalert

```bash
npm install gmalert
```

按需选择你想用的组件，配合 rollup、vite 等具有 tree-shake 功能的打包工具会自动清除你没有使用到的组件代码和样式哦

```js
import { alert, message } from 'gmalert'

const a = alert('这是一个没有按钮的对话框', {
  confirmLabel: '',
})

setTimeout(() => {
  a.close().then(() => {
    message('关掉了')
  })
}, 3000)
```
