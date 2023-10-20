var GmAlert = (function (exports) {
  'use strict';

  function animationendHandle($el, handle) {
    const animationend = e => {
      if (handle(e.animationName)) $el.removeEventListener('animationend', animationend);
    };
    $el.addEventListener('animationend', animationend);
  }

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;
    if (!css || typeof document === 'undefined') {
      return;
    }
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z$6 = "@charset \"UTF-8\";\n.gmsg-container___zBj1f {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 9999;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: visible;\n  font-size: 13px;\n  font-feature-settings: \"tnum\";\n  font-variant: tabular-nums;\n  line-height: 1.2;\n  color: rgba(0, 0, 0, 0.55);\n  list-style: none;\n  pointer-events: none;\n}\n.gmsg-container___zBj1f * {\n  box-sizing: border-box;\n}\n.gmsg-container___zBj1f .scroll-wrapper___Yqcvq {\n  position: absolute;\n  height: -moz-fit-content;\n  height: fit-content;\n  max-height: 100vh;\n  padding: 1rem 1rem 33px 50px;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  overflow: hidden scroll;\n  scroll-behavior: smooth;\n  /* 隐藏scrollbar */\n}\n.gmsg-container___zBj1f .scroll-wrapper___Yqcvq .scroll-content___Uv4Ha {\n  padding-bottom: 3rem;\n}\n.gmsg-container___zBj1f .scroll-wrapper___Yqcvq::-webkit-scrollbar {\n  display: none;\n  width: 0;\n  height: 0;\n}\n.gmsg-container___zBj1f .gmsg-notice-container___gOvtQ {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  pointer-events: all;\n}\n.gmsg-container___zBj1f .gmsg-message-container___2yUUf {\n  position: absolute;\n  top: calc(50% - 4rem);\n  right: 0;\n  left: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  pointer-events: all;\n}\n\n.gmsg-count___wPjtw {\n  position: absolute;\n  top: -4px;\n  left: -4px;\n  display: inline-block;\n  min-width: 16px;\n  height: 16px;\n  font-size: 12px;\n  line-height: 16px;\n  color: #fff;\n  text-align: center;\n  background-color: red;\n  border-radius: 2px;\n  animation-duration: 0.3s;\n}\n\n.gmsg-progress___j1--F {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  overflow: hidden;\n  border-bottom-right-radius: 5px;\n  border-bottom-left-radius: 5px;\n}\n.gmsg-progress___j1--F .gmsg-progress-bar___rgM9E {\n  display: flex;\n  width: 100%;\n  height: 0.25em;\n  background-color: rgba(0, 0, 0, 0.2);\n  transition: width 0.1s ease-in-out;\n}\n\n/* svg抖动 */\n@keyframes message-shake___1rFaO {\n  0%, 100% {\n    opacity: 1;\n    transform: translateX(0);\n  }\n  25%, 75% {\n    opacity: 0.75;\n    transform: translateX(-4px);\n  }\n  50% {\n    opacity: 0.25;\n    transform: translateX(4px);\n  }\n}";
  var styles$6 = {"gmsg-container":"gmsg-container___zBj1f","scroll-wrapper":"scroll-wrapper___Yqcvq","scroll-content":"scroll-content___Uv4Ha","gmsg-notice-container":"gmsg-notice-container___gOvtQ","gmsg-message-container":"gmsg-message-container___2yUUf","gmsg-count":"gmsg-count___wPjtw","gmsg-progress":"gmsg-progress___j1--F","gmsg-progress-bar":"gmsg-progress-bar___rgM9E","message-shake":"message-shake___1rFaO"};
  styleInject(css_248z$6);

  function newDiv(...className) {
    const $div = document.createElement('div');
    $div.classList.add(...className);
    return $div;
  }
  function slideOpenEl(el, duration) {
    const height = el.offsetHeight;
    const maxHeight = height + 10;
    changeStyle(el, ['max-height: 0', 'margin-bottom: 0', 'opacity: 0', `transition: all ${duration}`]);
    setTimeout(() => {
      changeStyle(el, [`max-height: ${maxHeight}px`]);
      el.style.marginBottom = '';
    }, 10);
  }
  function setMsgCount($el, count) {
    const countClassName = styles$6['gmsg-count'];
    let $count = $el.querySelector(`.${countClassName}`);
    if (!$count) {
      $count = document.createElement('span');
      $count.classList.add(countClassName);
      $el.append($count);
    }
    $count.innerHTML = `${count > 99 ? '99' : count}`;
    $count.style.animationName = '';
    setTimeout(() => {
      $count.style.animationName = styles$6['message-shake'];
    }, 50);
  }
  function setProgress($el, progress, timeout, pause = false) {
    let $progress = $el.querySelector(`.${styles$6['gmsg-progress']}`);
    let $progressBar = $el.querySelector(`.${styles$6['gmsg-progress-bar']}`);
    if (!$progress || !$progressBar) {
      $progress = newDiv(styles$6['gmsg-progress']);
      $progressBar = newDiv(styles$6['gmsg-progress-bar']);
      $progress.append($progressBar);
      $el.append($progress);
    }
    if (progress === 1) {
      changeStyle($progressBar, ['width: 100%', 'transition: none']);
    }
    if (pause) {
      setTimeout(() => {
        changeStyle($progressBar, ['transition: none', `width: ${progress * 100}%`]);
      }, 10);
    } else {
      setTimeout(() => {
        changeStyle($progressBar, ['width: 0', `transition: width ${timeout * progress}ms linear`]);
      }, 10);
    }
  }
  function getProgress($el) {
    const $progress = $el.querySelector(`.${styles$6['gmsg-progress']}`);
    const $progressBar = $el.querySelector(`.${styles$6['gmsg-progress-bar']}`);
    const progress = $progressBar.clientWidth / $progress.clientWidth;
    return progress;
  }
  const getContainer = () => {
    let $root = document.querySelector(`.${styles$6['gmsg-container']}`);
    if (!$root) {
      $root = newDiv(styles$6['gmsg-container'], 'gmsg-global-vars');
      document.body.append($root);
    }
    return $root;
  };
  const getMessageContainer = () => {
    let $root = document.querySelector(`.${styles$6['gmsg-message-container']}`);
    if ($root) return $root;
    $root = newDiv(styles$6['gmsg-message-container']);
    getContainer().append($root);
    return $root;
  };
  const getNoticeContainer = () => {
    let $scrollContainer = document.querySelector(`.${styles$6['scroll-content']}`);
    if ($scrollContainer) return $scrollContainer;
    const $wrapper = newDiv(styles$6['gmsg-notice-container']);
    const $scrollWrapper = newDiv(styles$6['scroll-wrapper']);
    $scrollContainer = newDiv(styles$6['scroll-content']);
    $scrollWrapper.append($scrollContainer);
    $wrapper.append($scrollWrapper);
    getContainer().append($wrapper);
    return $scrollContainer;
  };
  const getRoot = position => {
    switch (position) {
      case 'message':
        return getMessageContainer();
      case 'notice':
        return getNoticeContainer();
      case 'alert':
        return getContainer();
    }
  };

  // 用于修改样式的工具类，并且可以减少回流重绘，后面代码中会频繁用到
  function changeStyle(el, arr) {
    const original = el.style.cssText.split(';');
    original.pop();
    el.style.cssText = `${original.concat(arr).join(';')};`;
  }

  var css_248z$5 = ".icon___-ocR3 {\n  position: relative;\n  box-sizing: content-box;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 5em;\n  height: 5em;\n  margin: 0;\n  font-family: inherit;\n  line-height: 5em;\n  cursor: default;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n  border: 0.4em solid rgba(0, 0, 0, 0);\n  border-color: #000;\n  border-radius: 50%;\n}\n\n.success-icon___M1xKk {\n  border-color: rgba(166, 220, 134, 0.7);\n}\n.success-icon___M1xKk .success-ring-2___wZUBn {\n  position: absolute;\n  top: -0.375em;\n  left: -0.375em;\n  z-index: 2;\n  box-sizing: content-box;\n  width: 100%;\n  height: 100%;\n  border: 0.4em solid transparent;\n  border-top-color: #9ddf78;\n  border-right-color: #9ddf78;\n  border-radius: 50%;\n  animation: rotate-success-circular-line___RVx6h 0.4s ease-in;\n  animation-fill-mode: both;\n}\n.success-icon___M1xKk .success-fix___ljEoa {\n  position: absolute;\n  top: 0.5em;\n  left: 1.625em;\n  z-index: 1;\n  width: 0.4375em;\n  height: 5.625em;\n  transform: rotate(-45deg);\n}\n.success-icon___M1xKk .success-line___ukGjE {\n  position: absolute;\n  z-index: 2;\n  display: block;\n  height: 0.3125em;\n  background-color: #9ddf78;\n  border-radius: 0.125em;\n}\n.success-icon___M1xKk .success-line___ukGjE.line-tip___6T045 {\n  top: 2.875em;\n  left: 0.8125em;\n  width: 1.5625em;\n  transform: rotate(45deg);\n  animation: animate-success-line-tip___NLYYl 0.75s;\n}\n.success-icon___M1xKk .success-line___ukGjE.line-long___vHhdy {\n  top: 2.375em;\n  right: 0.5em;\n  width: 2.9375em;\n  transform: rotate(-45deg);\n  animation: animate-success-line-long___kIY1H 0.75s;\n}\n\n@keyframes rotate-success-circular-line___RVx6h {\n  0% {\n    transform: rotate(72deg);\n  }\n  5% {\n    transform: rotate(72deg);\n  }\n  75% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: rotate(-14deg);\n  }\n}\n@keyframes animate-success-line-tip___NLYYl {\n  0% {\n    top: 1.1875em;\n    left: 0.0625em;\n    width: 0;\n  }\n  54% {\n    top: 1.0625em;\n    left: 0.125em;\n    width: 0;\n  }\n  70% {\n    top: 2.1875em;\n    left: -0.375em;\n    width: 3.125em;\n  }\n  84% {\n    top: 3em;\n    left: 1.3125em;\n    width: 1.0625em;\n  }\n  100% {\n    top: 2.8125em;\n    left: 0.8125em;\n    width: 1.5625em;\n  }\n}\n@keyframes animate-success-line-long___kIY1H {\n  0% {\n    top: 3.375em;\n    right: 2.875em;\n    width: 0;\n  }\n  65% {\n    top: 3.375em;\n    right: 2.875em;\n    width: 0;\n  }\n  84% {\n    top: 2.1875em;\n    right: 0;\n    width: 3.4375em;\n  }\n  100% {\n    top: 2.375em;\n    right: 0.5em;\n    width: 2.9375em;\n  }\n}\n.error-icon___cVxX2 {\n  color: #f27474;\n  border-color: rgba(242, 116, 116, 0.7);\n  animation: animate-error-ring___5xajM 0.5s;\n}\n.error-icon___cVxX2 .error-ring___f20Hs {\n  flex-grow: 1;\n  height: 100%;\n  animation: animate-error-line___zpMj6 0.5s;\n}\n.error-icon___cVxX2 .error-ring___f20Hs .error-line-left___l7yQ1 {\n  position: absolute;\n  top: 2.3125em;\n  left: 1.0625em;\n  display: block;\n  width: 2.9375em;\n  height: 0.3125em;\n  background-color: #f27474;\n  border-radius: 0.125em;\n  transform: rotate(45deg);\n}\n.error-icon___cVxX2 .error-ring___f20Hs .error-line-right___orxiR {\n  position: absolute;\n  top: 2.3125em;\n  right: 1em;\n  display: block;\n  width: 2.9375em;\n  height: 0.3125em;\n  background-color: #f27474;\n  border-radius: 0.125em;\n  transform: rotate(-45deg);\n}\n\n@keyframes animate-error-ring___5xajM {\n  0% {\n    opacity: 0;\n    transform: rotateX(100deg);\n  }\n  100% {\n    opacity: 1;\n    transform: rotateX(0deg);\n  }\n}\n@keyframes animate-error-line___zpMj6 {\n  0% {\n    margin-top: 1.625em;\n    opacity: 0;\n    transform: scale(0.4);\n  }\n  50% {\n    margin-top: 1.625em;\n    opacity: 0;\n    transform: scale(0.4);\n  }\n  80% {\n    margin-top: -0.375em;\n    transform: scale(1.15);\n  }\n  100% {\n    margin-top: 0;\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.warn-icon___xtZIC {\n  color: #f8bb86;\n  border-color: rgba(250, 206, 168, 0.7);\n  animation: animate-error-ring___5xajM 0.5s;\n}\n.warn-icon___xtZIC .warn-content___eOKBq {\n  display: flex;\n  align-items: center;\n  font-size: 3.75em;\n  animation: animate-warn___yUKEu 0.8s;\n}\n\n@keyframes animate-warn___yUKEu {\n  0% {\n    opacity: 0;\n    transform: rotateZ(45deg);\n  }\n  25% {\n    opacity: 0.4;\n    transform: rotateZ(-25deg);\n  }\n  50% {\n    opacity: 0.8;\n    transform: rotateZ(15deg);\n  }\n  75% {\n    opacity: 1;\n    transform: rotateZ(-5deg);\n  }\n  100% {\n    opacity: 1;\n    transform: rotateX(0);\n  }\n}\n.info-icon___6kWTo {\n  color: #3fc3ee;\n  border-color: rgba(157, 224, 246, 0.7);\n  animation: animate-error-ring___5xajM 0.5s;\n}\n.info-icon___6kWTo .info-content___xXmH4 {\n  display: flex;\n  align-items: center;\n  font-size: 3.75em;\n  animation: animate-warn___yUKEu 0.8s;\n}\n\n.loading-icon___0IUQl {\n  line-height: 1;\n  border-color: transparent;\n}\n.loading-icon___0IUQl i {\n  font-size: 5.4em;\n}\n\n.icon___-ocR3.dense-icon___ULz7V {\n  align-self: center;\n  width: 2em;\n  min-width: 2em;\n  height: 2em;\n  border-width: 0.25em;\n}\n.icon___-ocR3.dense-icon___ULz7V.loading-icon___0IUQl i {\n  font-size: 2.25em;\n}\n.icon___-ocR3.dense-icon___ULz7V .success-ring-2___wZUBn {\n  top: -0.25em;\n  left: -0.25em;\n  width: 2em;\n  height: 2em;\n  border-width: 0.25em;\n}\n.icon___-ocR3.dense-icon___ULz7V .success-line___ukGjE {\n  height: 0.25em;\n}\n.icon___-ocR3.dense-icon___ULz7V .success-line___ukGjE.line-tip___6T045 {\n  top: 1.1em;\n  left: 0.22em;\n  width: 0.75em;\n  animation: animate-success-line-tip-dense___y9qYp 0.75s;\n}\n.icon___-ocR3.dense-icon___ULz7V .success-line___ukGjE.line-long___vHhdy {\n  top: 0.9em;\n  right: 0.15em;\n  width: 1.3em;\n  animation: animate-success-line-long-dense___upius 0.75s;\n}\n.icon___-ocR3.dense-icon___ULz7V .error-line-left___l7yQ1,\n.icon___-ocR3.dense-icon___ULz7V .error-line-right___orxiR {\n  top: 0.875em;\n  width: 1.5em;\n  height: 0.25em;\n}\n.icon___-ocR3.dense-icon___ULz7V .error-line-left___l7yQ1 {\n  left: 0.25em;\n}\n.icon___-ocR3.dense-icon___ULz7V .error-line-right___orxiR {\n  right: 0.25em;\n}\n.icon___-ocR3.dense-icon___ULz7V .warn-content___eOKBq,\n.icon___-ocR3.dense-icon___ULz7V .info-content___xXmH4,\n.icon___-ocR3.dense-icon___ULz7V .question-content___8EBDF {\n  font-size: 1.75em;\n  font-weight: bold;\n}\n\n@keyframes animate-success-line-tip-dense___y9qYp {\n  0% {\n    top: 0.5625em;\n    left: 0.0625em;\n    width: 0;\n  }\n  54% {\n    top: 0.25em;\n    left: 0.13em;\n    width: 0;\n  }\n  70% {\n    top: 0.7em;\n    left: -0.14em;\n    width: 1.4em;\n  }\n  84% {\n    top: 1.18em;\n    left: 0.3em;\n    width: 0.7em;\n  }\n  100% {\n    top: 1.1em;\n    left: 0.22em;\n    width: 0.75em;\n  }\n}\n@keyframes animate-success-line-long-dense___upius {\n  0% {\n    top: 1.6em;\n    right: 1.3em;\n    width: 0;\n  }\n  65% {\n    top: 1em;\n    right: 1em;\n    width: 0;\n  }\n  84% {\n    top: 0.91em;\n    right: 0;\n    width: 1.45em;\n  }\n  100% {\n    top: 0.9em;\n    right: 0.15em;\n    width: 1.3em;\n  }\n}";
  var styles$5 = {"icon":"icon___-ocR3","success-icon":"success-icon___M1xKk","success-ring-2":"success-ring-2___wZUBn","rotate-success-circular-line":"rotate-success-circular-line___RVx6h","success-fix":"success-fix___ljEoa","success-line":"success-line___ukGjE","line-tip":"line-tip___6T045","animate-success-line-tip":"animate-success-line-tip___NLYYl","line-long":"line-long___vHhdy","animate-success-line-long":"animate-success-line-long___kIY1H","error-icon":"error-icon___cVxX2","animate-error-ring":"animate-error-ring___5xajM","error-ring":"error-ring___f20Hs","animate-error-line":"animate-error-line___zpMj6","error-line-left":"error-line-left___l7yQ1","error-line-right":"error-line-right___orxiR","warn-icon":"warn-icon___xtZIC","warn-content":"warn-content___eOKBq","animate-warn":"animate-warn___yUKEu","info-icon":"info-icon___6kWTo","info-content":"info-content___xXmH4","loading-icon":"loading-icon___0IUQl","dense-icon":"dense-icon___ULz7V","animate-success-line-tip-dense":"animate-success-line-tip-dense___y9qYp","animate-success-line-long-dense":"animate-success-line-long-dense___upius","question-content":"question-content___8EBDF"};
  styleInject(css_248z$5);

  var css_248z$4 = "@charset \"UTF-8\";\n.animate-turn___HyJtE {\n  animation: message-turn___ycjUm 1s linear infinite;\n}\n\n.icon___eLUlc svg {\n  width: 1em;\n  height: 1em;\n}\n\n/* loading的转动 */\n@keyframes message-turn___ycjUm {\n  0% {\n    transform: rotate(0deg);\n  }\n  25% {\n    transform: rotate(90deg);\n  }\n  50% {\n    transform: rotate(180deg);\n  }\n  75% {\n    transform: rotate(270deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}";
  var styles$4 = {"animate-turn":"animate-turn___HyJtE","message-turn":"message-turn___ycjUm","icon":"icon___eLUlc"};
  styleInject(css_248z$4);

  const ICONS = new Map([['info', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" style="fill:#29abe2"/><circle cx="12" cy="6.25" r="1.5" style="fill:#fff"/><path d="M16,22.6a1.15,1.15,0,0,1-1.15-1.15V15.7H14.5a1.15,1.15,0,0,1,0-2.3H16a1.14,1.14,0,0,1,1.15,1.15v6.9A1.15,1.15,0,0,1,16,22.6Z" transform="translate(-4 -4)" style="fill:#fff"/><path d="M18,23.1H14a1.1,1.1,0,1,1,0-2.2h4a1.1,1.1,0,0,1,0,2.2Z" transform="translate(-4 -4)" style="fill:#fff"/></svg>`], ['warning', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" style="fill:#faad14"/><path d="M12,19.5A1.5,1.5,0,1,0,10.5,18,1.5,1.5,0,0,0,12,19.5Z" style="fill:#fff;fill-rule:evenodd"/><path d="M12,14a1.5,1.5,0,0,1-1.5-1.5v-7a1.5,1.5,0,0,1,3,0v7A1.5,1.5,0,0,1,12,14Z" style="fill:#fff"/></svg>`], ['error', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,24.06a12,12,0,1,0-12-12A12,12,0,0,0,12,24.06Z" transform="translate(0.01 -0.06)" style="fill:#f5222d"/><path d="M16.17,7.83,7.83,16.17" transform="translate(0.01 -0.06)" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.799999952316284px"/><path d="M7.83,7.83l8.34,8.34" transform="translate(0.01 -0.06)" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.799999952316284px"/></svg>'], ['success', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,.5l3.18,2.2h3.93l1.21,3.55,3.18,2.2L22.28,12l1.22,3.55-3.18,2.2L19.11,21.3H15.18L12,23.5,8.82,21.3H4.89L3.68,17.75.5,15.55,1.72,12,.5,8.45l3.18-2.2L4.89,2.7H8.82Z" style="fill:#52c41a;stroke:#52c41a;stroke-linecap:round;stroke-linejoin:round"/><path d="M7.23,12l3.18,3L16.77,9" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg>'], ['loading', `<svg class="${styles$4['animate-turn']}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M1,12.06a11,11,0,0,0,11,11h0a11,11,0,0,0,0-22" transform="translate(0.01 -0.06)" style="fill:none;stroke:#1890ff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><path d="M18.59,12.06a6.6,6.6,0,1,0-6.6,6.6h0" transform="translate(0.01 -0.06)" style="fill:none;stroke:#1890ff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg>`], ['close', '<svg width="1em" height="1em" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M14 14L34 34" stroke="#909399" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 34L34 14" stroke="#909399" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>']]);
  function svgIcon(name, className = '') {
    return `<i class="${styles$4.icon} ${className}">${ICONS.get(name)}</i>`;
  }

  function SuccessIcon(dense = false, className = '') {
    return `<div class="${styles$5.icon} ${styles$5['success-icon']} ${dense ? styles$5['dense-icon'] : ''} ${className}"><div class="${styles$5['success-line']} ${styles$5['line-tip']}"></div><div class="${styles$5['success-line']} ${styles$5['line-long']}"></div><div class="${styles$5['success-ring-2']}"></div><div class="${styles$5['success-fix']}"></div></div>`;
  }
  function ErrorIcon(dense = false, className = '') {
    return `<div class="${styles$5.icon} ${styles$5['error-icon']} ${dense ? styles$5['dense-icon'] : ''} ${className}"><div class="${styles$5['error-ring']}"><div class="${styles$5['error-line-left']}"></div><div class="${styles$5['error-line-right']}"></div></div></div>`;
  }
  function WarnIcon(dense = false, className = '') {
    return `<div class="${styles$5.icon} ${styles$5['warn-icon']} ${dense ? styles$5['dense-icon'] : ''} ${className}"><div class="${styles$5['warn-content']}">!</div></div>`;
  }
  function InfoIcon(dense = false, className = '') {
    return `<div class="${styles$5.icon} ${styles$5['info-icon']} ${dense ? styles$5['dense-icon'] : ''} ${className}"><div class="${styles$5['info-content']}">i</div></div>`;
  }
  function LoadingIcon(dense = false, className = '') {
    const icon = svgIcon('loading');
    return `<div class="${styles$5.icon} ${styles$5['loading-icon']} ${dense ? styles$5['dense-icon'] : ''} ${className}">${icon}</div>`;
  }

  function AnimatedIcon(name, dense = false, className) {
    switch (name) {
      case 'success':
        return SuccessIcon(dense, className);
      case 'error':
        return ErrorIcon(dense, className);
      case 'warning':
        return WarnIcon(dense, className);
      case 'info':
        return InfoIcon(dense, className);
      case 'loading':
        return LoadingIcon(dense, className);
      default:
        return SuccessIcon(dense, className);
    }
  }
  function SvgIcon(name, className) {
    return svgIcon(name, className);
  }

  var css_248z$3 = ".alert___Su0Xe {\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  min-width: 350px;\n  padding: 1rem;\n  pointer-events: all;\n  background-color: #fff;\n  border-radius: 5px;\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0.075), 0 1px 2px rgba(0, 0, 0, 0.075), 1px 2px 4px rgba(0, 0, 0, 0.075), 1px 3px 8px rgba(0, 0, 0, 0.075), 2px 4px 16px rgba(0, 0, 0, 0.075);\n  animation: alert-show___fKZw2 0.3s;\n  animation-fill-mode: both;\n}\n.alert___Su0Xe.is-opening___LZKyT, .alert___Su0Xe.is-closing___OYm2- {\n  pointer-events: none;\n}\n\n.alert-icon___Wi1df {\n  margin: 0 auto;\n}\n\n.alert-btn-group___uvh-2 {\n  display: flex;\n  justify-content: center;\n  margin-top: 1rem;\n}\n.alert-btn-group___uvh-2 .alert-btn___AgfUF {\n  padding: 0.625em 1.1em;\n  margin: 0.3125em;\n  font-size: 1em;\n  font-weight: 500;\n  color: #fff;\n  cursor: pointer;\n  background: transparent none repeat 0 0 / auto auto padding-box border-box scroll;\n  background: initial;\n  background-color: #7066e0;\n  border: 0;\n  border-radius: 0.25em;\n}\n.alert-btn-group___uvh-2 .alert-btn___AgfUF:hover {\n  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));\n}\n\n.alert-content___3l0Cr {\n  z-index: 1;\n  margin: 1em 1.6em 0.3em;\n  overflow: auto;\n  font-size: 1.125em;\n  color: inherit;\n  text-align: center;\n  word-break: break-word;\n  word-wrap: break-word;\n}\n\n.alert-title___-WvmC {\n  position: relative;\n  max-width: 100%;\n  padding: 0.8em 1em 0;\n  margin: 0;\n  font-size: 1.875em;\n  font-weight: 600;\n  color: inherit;\n  text-align: center;\n  text-transform: none;\n  word-wrap: break-word;\n}\n\n.alert-close___vIbaH {\n  position: absolute;\n  top: 4px;\n  right: 4px;\n  font-size: 20px;\n  cursor: pointer;\n}\n\n@keyframes alert-show___fKZw2 {\n  0% {\n    transform: scale(0.7);\n  }\n  45% {\n    transform: scale(1.05);\n  }\n  80% {\n    transform: scale(0.95);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n@keyframes alert-hide___ZbDx6 {\n  0% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(0.5);\n  }\n}";
  var styles$3 = {"alert":"alert___Su0Xe","alert-show":"alert-show___fKZw2","is-opening":"is-opening___LZKyT","is-closing":"is-closing___OYm2-","alert-icon":"alert-icon___Wi1df","alert-btn-group":"alert-btn-group___uvh-2","alert-btn":"alert-btn___AgfUF","alert-content":"alert-content___3l0Cr","alert-title":"alert-title___-WvmC","alert-close":"alert-close___vIbaH","alert-hide":"alert-hide___ZbDx6"};
  styleInject(css_248z$3);

  function Button(text, onClick) {
    const $btn = document.createElement('button');
    $btn.textContent = text;
    $btn.onclick = onClick;
    $btn.classList.add(styles$3['alert-btn']);
    return $btn;
  }
  function GmAlert(props) {
    const type = props.type || 'info';
    const $wrapper = newDiv(styles$3.alert);
    const icon = AnimatedIcon(type, false, styles$3['alert-icon']);
    $wrapper.innerHTML = `${icon}<div class="${styles$3['alert-title']}">${props.title}</div>`;
    if (props.content) {
      const $text = newDiv(styles$3['alert-content']);
      $text.textContent = props.content;
      $wrapper.append($text);
    }
    const $root = getRoot('alert');
    const open = () => {
      $wrapper.classList.add(styles$3['is-opening']);
      $root.append($wrapper);
      return new Promise(resolve => {
        const handle = animationName => {
          if (animationName === styles$3['alert-show']) {
            $wrapper.classList.remove(styles$3['is-opening']);
            resolve();
            return true;
          }
          return false;
        };
        animationendHandle($wrapper, handle);
      });
    };
    const close = () => {
      $wrapper.classList.add(styles$3['is-closing']);
      $wrapper.style.animationName = styles$3['alert-hide'];
      return new Promise(resolve => {
        const handle = e => {
          if (e === styles$3['alert-hide']) {
            $wrapper.remove();
            props.onClosed && props.onClosed();
            resolve();
            return true;
          }
          return false;
        };
        animationendHandle($wrapper, handle);
      });
    };
    if (props.onCancel || props.onConfirm) {
      const $buttons = newDiv(styles$3['alert-btn-group']);
      if (props.onCancel) {
        const $cancel = Button('取消', props.onCancel);
        $buttons.append($cancel);
      }
      if (props.onConfirm) {
        const $confirm = Button('确定', props.onConfirm);
        $buttons.append($confirm);
      }
      $wrapper.append($buttons);
    }
    if (props.showClose) {
      const $close = newDiv(styles$3['alert-close']);
      $close.innerHTML = SvgIcon('close');
      $close.onclick = () => {
        close();
      };
      $wrapper.append($close);
    }
    return {
      close,
      open,
      $el: $wrapper
    };
  }

  var css_248z$2 = ".infomation___WcGAv {\n  position: absolute;\n  right: 2em;\n  bottom: 1.5em;\n  display: flex;\n  flex-direction: column;\n  width: 21em;\n  pointer-events: all;\n  background: #fff;\n  border-radius: 5px;\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0.075), 0 1px 2px rgba(0, 0, 0, 0.075), 1px 2px 4px rgba(0, 0, 0, 0.075), 1px 3px 8px rgba(0, 0, 0, 0.075), 2px 4px 16px rgba(0, 0, 0, 0.075);\n  animation: 0.3s infomation-move-in___LnWlx cubic-bezier(0.42, 0, 0.3, 1.11);\n}\n\n.infomation-header___Mx3C- {\n  position: relative;\n  display: flex;\n  justify-content: space-between;\n  padding: 0.5em 1.5em;\n  font-weight: 600;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.25);\n}\n\n.infomation-status___O2AiV {\n  position: absolute;\n  top: 0.5em;\n  left: 0.5em;\n  width: 1.2em;\n  height: 1.2em;\n  border-radius: 4px;\n}\n\n.infomation-content___nOlIu {\n  padding: 0.5em 1em;\n  font-size: 1.125em;\n}\n\n@keyframes infomation-move-in___LnWlx {\n  0% {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes infomation-move-out___ZmH-A {\n  100% {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n}";
  var styles$2 = {"infomation":"infomation___WcGAv","infomation-move-in":"infomation-move-in___LnWlx","infomation-header":"infomation-header___Mx3C-","infomation-status":"infomation-status___O2AiV","infomation-content":"infomation-content___nOlIu","infomation-move-out":"infomation-move-out___ZmH-A"};
  styleInject(css_248z$2);

  const ColorMap = {
    info: '#409eff',
    success: '#67c23a',
    warning: '#e6a23c',
    error: '#f56c6c'
  };
  function GmInfomation(props) {
    const color = ColorMap[props.type || 'info'] || ColorMap.info;
    const $wrapper = newDiv(styles$2.infomation);
    $wrapper.innerHTML = `<div class="${styles$2['infomation-header']}"><div class="${styles$2['infomation-status']}" style="background: ${color};"></div><div style="margin-left: .5em;">${props.title || '你有一条消息'}</div></div><div class="${styles$2['infomation-content']}">${props.content}</div>`;
    const $root = getRoot('alert');
    const open = () => {
      $root.append($wrapper);
      return new Promise(resolve => {
        const handle = e => {
          if (e === styles$2['infomation-move-in']) {
            resolve();
            return true;
          }
          return false;
        };
        animationendHandle($wrapper, handle);
      });
    };
    const close = () => {
      return new Promise(resolve => {
        $wrapper.style.animationName = styles$2['infomation-move-out'];
        const handle = e => {
          if (e === styles$2['infomation-move-out']) {
            $wrapper.remove();
            resolve();
            return true;
          }
          return false;
        };
        animationendHandle($wrapper, handle);
      });
    };
    return {
      open,
      close,
      $el: $wrapper
    };
  }

  class Alert {
    locked = false;
    constructor(form = 'alert') {
      this.form = form;
    }
    fire(title, text, type, config) {
      if (this.locked) {
        return;
      }
      this.locked = true;
      if (this.activeInst) {
        if (this.form === 'alert') {
          console.warn(`you fire a alert when last one is not closed. That's maybe unsafe.`);
        }
        this.activeInst.close();
        this.activeInst = undefined;
      }
      const inst = this.createInst(title, text, type, config);
      this.activeInst = inst;
      inst.open().then(() => {
        this.locked = false;
      });
      return inst;
    }
    createInst(title, text, type, config) {
      const inst = this.form === 'alert' ? GmAlert({
        title,
        content: text,
        type: type || 'success',
        showClose: config?.showClose,
        onConfirm: config?.onConfirm,
        onCancel: config?.onCancel,
        onClosed: () => {
          if (config?.onClosed) {
            config.onClosed();
          }
        }
      }) : GmInfomation({
        content: title,
        title: text,
        type: type || 'success',
        hideIn: config?.hideIn,
        onClosed: () => {
          if (config?.onClosed) {
            config.onClosed();
          }
        }
      });
      return inst;
    }
  }

  var css_248z$1 = "@charset \"UTF-8\";\n.message-wrapper___RQNGo {\n  position: relative;\n  overflow: visible;\n  transform-origin: center;\n  animation-duration: 0.3s;\n}\n.message-wrapper___RQNGo > :nth-child(2) {\n  opacity: 0;\n}\n.message-wrapper___RQNGo .icon___kbi0p {\n  position: absolute;\n  top: 8px;\n  left: 8px;\n  font-size: 16px;\n}\n.message-wrapper___RQNGo .message-main___D6FFM {\n  position: relative;\n  box-sizing: border-box;\n  min-width: 3rem;\n  max-width: 20em;\n  padding: 8px;\n  padding-left: 30px;\n  margin-bottom: 0.4rem;\n  overflow: hidden;\n  text-align: center;\n  background: #fff;\n  border-radius: 4px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  /* 从中间开始放大 */\n  transform-origin: center;\n  animation-duration: 0.3s;\n}\n.message-wrapper___RQNGo .message-content___pXEB4 {\n  text-align: left;\n  pointer-events: all;\n  /* 解决字体模糊抖动问题 */\n  transform: perspective(1px);\n}\n\n@keyframes message-moveout___eUOsA {\n  0% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(0.7);\n  }\n}\n@keyframes message-out___7j7-9 {\n  100% {\n    max-height: 0;\n    padding-top: 0;\n    padding-bottom: 0;\n    margin-bottom: 0;\n  }\n}\n@keyframes message-movein___cYj94 {\n  0% {\n    opacity: 0;\n    transform: scale(0.5);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}";
  var styles$1 = {"message-wrapper":"message-wrapper___RQNGo","icon":"icon___kbi0p","message-main":"message-main___D6FFM","message-content":"message-content___pXEB4","message-moveout":"message-moveout___eUOsA","message-out":"message-out___7j7-9","message-movein":"message-movein___cYj94"};
  styleInject(css_248z$1);

  const MessageState = {
    opening: styles$1['message-movein'],
    done: '',
    closing: styles$1['message-moveout']
  };
  function GmMessage(props) {
    const icon = SvgIcon(props.type, styles$1.icon);
    const $wrapper = newDiv(styles$1['message-wrapper']);
    const $main = newDiv(styles$1['message-main']);
    $wrapper.append($main);
    $main.innerHTML = `${icon}<div class=${styles$1['message-content']}>${props.content}</div>`;
    const open = () => {
      getRoot('message').append($wrapper);
      $wrapper.style.animationName = MessageState.opening;
      return new Promise(resolve => {
        const handle = e => {
          if (e === MessageState.opening) {
            resolve();
            return true;
          }
          return false;
        };
        animationendHandle($wrapper, handle);
      });
    };
    const close = () => {
      $main.style.maxHeight = `${$main.offsetHeight}px`;
      $wrapper.style.animationName = MessageState.closing;
      $main.style.animationName = styles$1['message-out'];
      return new Promise(resolve => {
        const handle = e => {
          if (e === MessageState.closing) {
            $wrapper.remove();
            props.onClosed();
            resolve();
            return true;
          }
          return false;
        };
        animationendHandle($wrapper, handle);
      });
    };
    return {
      open,
      close,
      $el: $wrapper
    };
  }

  var css_248z = "@charset \"UTF-8\";\n.notice___xJTn2 {\n  position: relative;\n  width: 20rem;\n  margin-bottom: 1em;\n  background: #fff;\n  border-radius: 5px;\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0.075), 0 1px 2px rgba(0, 0, 0, 0.075), 1px 2px 4px rgba(0, 0, 0, 0.075), 1px 3px 8px rgba(0, 0, 0, 0.075), 2px 4px 16px rgba(0, 0, 0, 0.075);\n  opacity: 0;\n  transform-origin: top center;\n  animation-duration: 0.25s;\n}\n.notice___xJTn2 .notice-main___YXiGH {\n  display: flex;\n  flex-direction: column;\n  align-items: normal;\n}\n.notice___xJTn2 .notice-main___YXiGH .notice-content___ysok2 {\n  position: relative;\n  margin: 1rem 1rem 1.2rem 3.4rem;\n}\n.notice___xJTn2 .notice-icon___MvUBU {\n  position: absolute;\n  top: 0.7rem;\n  left: 1rem;\n}\n\n/* notice进入 */\n@keyframes notice-movein___M8YUM {\n  0% {\n    opacity: 0;\n    transform: translateX(100%);\n  }\n  50% {\n    opacity: 0.75;\n  }\n  100% {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n/* notice退出 */\n@keyframes notice-moveout___vwgYy {\n  0% {\n    opacity: 1;\n  }\n  60% {\n    opacity: 0;\n    transform: translateX(100%);\n  }\n  100% {\n    max-height: 0;\n    margin: 0;\n    opacity: 0;\n  }\n}";
  var styles = {"notice":"notice___xJTn2","notice-main":"notice-main___YXiGH","notice-content":"notice-content___ysok2","notice-icon":"notice-icon___MvUBU","notice-movein":"notice-movein___M8YUM","notice-moveout":"notice-moveout___vwgYy"};
  styleInject(css_248z);

  const noticeState = {
    opening: styles['notice-movein'],
    done: '',
    closing: styles['notice-moveout']
  };
  function GmNotice(props) {
    const icon = AnimatedIcon(props.type, true, styles['notice-icon']);
    const $wrapper = newDiv(styles.notice);
    $wrapper.innerHTML = `<div class="${styles['notice-main']}">${icon}\
  <div class="${styles['notice-content']}">${props.content}</div></div>`;
    const open = () => {
      getRoot('notice').prepend($wrapper);
      return new Promise(resolve => {
        slideOpenEl($wrapper, '.1s');
        setTimeout(() => {
          $wrapper.style.transition = '';
          changeStyle($wrapper, ['opacity: 1', `animation-name: ${noticeState.opening}`]);
        }, 100);
        const handle = e => {
          if (e === noticeState.opening) {
            resolve();
            return true;
          }
          return false;
        };
        animationendHandle($wrapper, handle);
      });
    };
    const close = () => {
      return new Promise(resolve => {
        $wrapper.style.maxHeight = `${$wrapper.offsetHeight + 10}px`;
        $wrapper.style.animationName = noticeState.closing;
        const handle = e => {
          if (e === noticeState.closing) {
            $wrapper.remove();
            props.onClosed();
            resolve();
            return true;
          }
          return false;
        };
        animationendHandle($wrapper, handle);
      });
    };
    return {
      open,
      close,
      $el: $wrapper
    };
  }

  /**
   * 消息容器
   */
  class Msg {
    timeout = 2500;
    maxCount = 8;
    activeInsts = new Map();
    constructor(form) {
      this.form = form;
    }
    config(config) {
      this.timeout = config.timeout || this.timeout;
      this.maxCount = config.maxCount || this.maxCount;
    }
    fire(content, type, timeout) {
      const inst = this.judgeReMsg(content, type || 'success');
      if (type !== 'loading') {
        this.setTimeOut(inst, timeout || this.timeout);
      }
      return inst;
    }

    // 设置定时
    setTimeOut(oMsg, timeout) {
      if (!timeout) return;
      const $el = oMsg.$el;
      setProgress($el, 1, timeout);
      oMsg.timer && clearInterval(oMsg.timer);
      oMsg.timer = setInterval(() => {
        if (getProgress($el) === 0) {
          oMsg.close();
          clearInterval(oMsg.timer);
        }
      }, 150);
      $el.addEventListener('mouseenter', () => {
        setProgress($el, getProgress($el), timeout, true);
      });
      $el.addEventListener('mouseleave', () => {
        setProgress($el, getProgress($el), timeout);
      });
    }

    // 判断消息是否存在, 设置msgCount以及关闭多余消息
    judgeReMsg(content, type) {
      const id = `${content}${type}`;
      for (const inst of this.activeInsts) {
        if (inst[1].identifer === id) {
          inst[1].count += 1;
          setMsgCount(inst[1].$el, inst[1].count);
          return inst[1];
        }
      }
      const props = {
        content,
        type,
        onClosed: () => {
          this.activeInsts.delete(id);
        }
      };
      const inst = this.form === 'msg' ? GmMessage(props) : GmNotice(props);
      if (this.activeInsts.size >= this.maxCount) {
        this.activeInsts.values().next().value.close();
      }
      const oMsg = {
        ...inst,
        identifer: id,
        count: 1
      };
      this.activeInsts.set(id, oMsg);
      oMsg.open();
      return oMsg;
    }
  }

  const $alert = new Alert();
  const alert = (title, text, type, config) => {
    return $alert.fire(title, text, type, config);
  };
  const $infomation = new Alert('infomation');
  const infomation = (content, title, type, config) => {
    return $infomation.fire(content, title, type, config);
  };
  const $message = new Msg('msg');
  const message = (content, type, timeout) => {
    return $message.fire(content, type, timeout);
  };
  message.config = $message.config.bind($message);
  const $notice = new Msg('notice');
  const notice = (content, type, timeout) => {
    return $notice.fire(content, type, timeout);
  };
  notice.config = $notice.config.bind($notice);

  exports.alert = alert;
  exports.infomation = infomation;
  exports.message = message;
  exports.notice = notice;

  return exports;

})({});
//# sourceMappingURL=index.js.map
