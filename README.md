# Gmalert 2

English | [简体中文](./README_zh_CN.md)

Gmalert 2 is a lightweight, dependency-free feedback component that includes three built-in modules: **alert** (dialog boxes, modals), **message** (toast notifications), and **notice** (sliding notifications from the top or bottom). It supports custom colors, icons, and content.

Feedback components are essential for any mature web system. While many UI component libraries include their own feedback solutions, finding a native JavaScript feedback component that is framework-agnostic is rare. That’s why I developed Gmalert. "Gm" comes from my online name "Gmero" and "alert" represents its notification function.

The v1 version of Gmalert was developed with core functionality and a size of around 18KB. However, feedback from users highlighted that the mobile experience was suboptimal. As a result, the focus of v2 development shifted towards optimizing for mobile devices. The less-used Information module was removed, the styles were overhauled, and pre-defined styles like error, success, and warn were eliminated. Customization of colors, icons, etc., was handed over to the user. These changes reduced Gmalert v2 to under 10KB.

[DEMO](https://gmeroalert.github.io/GmAlert)

You can find the demo code [here](https://github.com/GmeroAlert/GmAlert/tree/main/src/demo).

## Key Features

**Lightweight**: "Lightweight" has always been a core design goal for this project. Gmalert v2 reduces its size by half compared to the previous version, coming in at just 10KB. When gzip compressed, it’s only 3.9KB.

**Comprehensive Functionality**: Gmalert 2 offers three powerful modules: **alert** (a confirmation dialog with modal, customizable dialogs, and form submission dialogs that can close asynchronously), **message** (a compact toast notification for simple messages), and **notice** (sliding notifications from the top or bottom that are eye-catching and easily customizable). These three modules can cover nearly all feedback scenarios, and they are highly customizable. For instance, the search panel on this site was built using the alert module’s custom HTML feature.

**Easy to Use**: No need to import separate CSS files—everything is handled with just one JS file! Stylesheets are embedded directly in the JS code and automatically added to the head during runtime. You can also use the esm version of Gmalert available on NPM, which supports tree-shaking, allowing you to include only the components you need.

**SSR Friendly**: Optimized for server-side rendering to prevent errors in server environments.

**Framework Friendly**: Gmalert 2 supports dynamic updates. Use the update function to update configurations, making it easier to encapsulate in responsive frameworks.

## Quick Start

Download the latest resource file (**gmalert.min.js**) from the [Releases · GmeroAlert/GmAlert (github.com)](https://github.com/GmeroAlert/GmAlert/releases) page, and include it in your webpage:

```html
<body>
  <script src="path/to/gmalert.min.js"></script>
</body>
```

Now you can start using it:

```javascript
Gmal.alert('this is a dialog box')

Gmal.message('I will dispear in 3s', 3000)

Gmal.message('this is a loading icon build-in', {
  icon: 'loading', // Enter other icons as HTML code, such as svg
  timeout: 0, // Set to 0 to close manually
})

Gmal.notice('you should be right', {
  background: 'red',
  color: '#fff',
})
```

## using on NPM

Get Gmalert via NPM

```bash
npm install gmalert
```

Select the components you want to use. When using a bundler like rollup or vite that supports tree-shaking, it will automatically remove unused component code and styles.

```js
import { alert, message } from 'gmalert'

const a = alert('this is a dialog whitout button', {
  confirmLabel: '',
})

setTimeout(() => {
  a.close().then(() => {
    message('closed!')
  })
}, 3000)
```
