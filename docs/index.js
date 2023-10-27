var GmAlert = (function () {
  'use strict';

  function animationendHandle($el, handle) {
    const animationend = e => {
      if (handle(e.animationName)) $el.removeEventListener('animationend', animationend);
    };
    $el.addEventListener('animationend', animationend);
  }
  function changeAnimation($el, animationName) {
    $el.style.animationName = animationName;
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

  var css_248z$7 = "@charset \"UTF-8\";\n/* 获取颜色 */\n.gmsg-container___zBj1f {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 9999;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: visible;\n  pointer-events: none;\n}\n.gmsg-container___zBj1f * {\n  box-sizing: border-box;\n}\n.gmsg-container___zBj1f .scroll-wrapper___Yqcvq {\n  position: absolute;\n  height: -moz-fit-content;\n  height: fit-content;\n  max-height: 100vh;\n  padding: 1rem 1rem 33px 50px;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  overflow: hidden scroll;\n  scroll-behavior: smooth;\n  /* 隐藏scrollbar */\n}\n.gmsg-container___zBj1f .scroll-wrapper___Yqcvq .scroll-content___Uv4Ha {\n  padding-bottom: 3rem;\n  pointer-events: all;\n}\n.gmsg-container___zBj1f .scroll-wrapper___Yqcvq::-webkit-scrollbar {\n  display: none;\n  width: 0;\n  height: 0;\n}\n.gmsg-container___zBj1f .gmsg-notice-container___gOvtQ {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n}\n.gmsg-container___zBj1f .gmsg-message-container___2yUUf {\n  position: absolute;\n  top: calc(50% - 4rem);\n  right: 0;\n  left: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  pointer-events: all;\n}\n\n.gmsg-count___wPjtw {\n  position: absolute;\n  top: -4px;\n  left: -4px;\n  display: inline-block;\n  min-width: 16px;\n  height: 16px;\n  font-size: 12px;\n  line-height: 16px;\n  color: #fff;\n  text-align: center;\n  background-color: red;\n  border-radius: 2px;\n  animation-duration: 0.3s;\n}\n\n.gmsg-progress___j1--F {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  overflow: hidden;\n  border-bottom-right-radius: 5px;\n  border-bottom-left-radius: 5px;\n}\n.gmsg-progress___j1--F .gmsg-progress-bar___rgM9E {\n  display: flex;\n  width: 100%;\n  height: 0.25em;\n  background-color: var(--gma-light);\n}\n\n/* svg抖动 */\n@keyframes shake___vLuMZ {\n  0%, 100% {\n    opacity: 1;\n    transform: translateX(0);\n  }\n  25%, 75% {\n    opacity: 0.75;\n    transform: translateX(-4px);\n  }\n  50% {\n    opacity: 0.25;\n    transform: translateX(4px);\n  }\n}";
  var styles$6 = {"gmsg-container":"gmsg-container___zBj1f","scroll-wrapper":"scroll-wrapper___Yqcvq","scroll-content":"scroll-content___Uv4Ha","gmsg-notice-container":"gmsg-notice-container___gOvtQ","gmsg-message-container":"gmsg-message-container___2yUUf","gmsg-count":"gmsg-count___wPjtw","gmsg-progress":"gmsg-progress___j1--F","gmsg-progress-bar":"gmsg-progress-bar___rgM9E","shake":"shake___vLuMZ"};
  styleInject(css_248z$7);

  function newDiv(...className) {
    const $div = document.createElement('div');
    $div.classList.add(...className);
    return $div;
  }
  function slideOpenEl(el, duration) {
    const height = el.offsetHeight;
    const maxHeight = height + 10;
    changeStyle(el, ['max-height:0', 'margin-bottom:0', 'opacity:0', `transition:all ${duration}`]);
    setTimeout(() => {
      changeStyle(el, [`max-height:${maxHeight}px`]);
      el.style.marginBottom = '';
    });
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
    changeAnimation($count, '');
    setTimeout(() => {
      changeAnimation($count, styles$6.shake);
    });
  }
  const getContainer = () => {
    let $root = document.querySelector(`.${styles$6['gmsg-container']}`);
    if (!$root) {
      $root = newDiv(styles$6['gmsg-container'], 'gmalert-global-vars');
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

  // 0: message | 1: notice | 2: alert
  const getRoot = type => {
    switch (type) {
      case 0:
        return getMessageContainer();
      case 1:
        return getNoticeContainer();
      case 2:
        return getContainer();
    }
  };

  // 用于修改样式的工具类，并且可以减少回流重绘，后面代码中会频繁用到
  function changeStyle(el, arr) {
    const original = el.style.cssText.split(';');
    original.pop();
    el.style.cssText = `${original.concat(arr).join(';')};`;
  }

  var css_248z$6 = "@charset \"UTF-8\";\n/* 获取颜色 */\n.icon___-ocR3 {\n  position: relative;\n  box-sizing: content-box;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 5em;\n  height: 5em;\n  margin: 0;\n  line-height: 5em;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n  border: 0.4em solid rgba(0, 0, 0, 0);\n  border-radius: 50%;\n}\n\n.success-icon___M1xKk {\n  border-color: rgba(166, 220, 134, 0.7);\n}\n.success-icon___M1xKk .success-ring___ZGOdP {\n  position: absolute;\n  top: -0.375em;\n  left: -0.375em;\n  z-index: 2;\n  box-sizing: content-box;\n  width: 100%;\n  height: 100%;\n  border: 0.4em solid transparent;\n  border-top-color: #9ddf78;\n  border-right-color: #9ddf78;\n  border-radius: 50%;\n  animation: rt-rscl___M-0L3 0.4s ease-in;\n  animation-fill-mode: both;\n}\n.success-icon___M1xKk .success-fix___ljEoa {\n  position: absolute;\n  top: 0.5em;\n  left: 1.625em;\n  z-index: 1;\n  width: 0.4375em;\n  height: 5.625em;\n  transform: rotate(-45deg);\n}\n.success-icon___M1xKk .success-line___ukGjE {\n  position: absolute;\n  z-index: 2;\n  display: block;\n  height: 0.3125em;\n  background-color: #9ddf78;\n  border-radius: 0.125em;\n}\n.success-icon___M1xKk .success-line___ukGjE.line-tip___6T045 {\n  top: 2.875em;\n  left: 0.8125em;\n  width: 1.5625em;\n  transform: rotate(45deg);\n  animation: anim-slt___Cp4aJ 0.75s;\n}\n.success-icon___M1xKk .success-line___ukGjE.line-long___vHhdy {\n  top: 2.375em;\n  right: 0.5em;\n  width: 2.9375em;\n  transform: rotate(-45deg);\n  animation: anim-sll___VWeIJ 0.75s;\n}\n\n@keyframes rt-rscl___M-0L3 {\n  0% {\n    transform: rotate(72deg);\n  }\n  5% {\n    transform: rotate(72deg);\n  }\n  75% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: rotate(-14deg);\n  }\n}\n@keyframes anim-slt___Cp4aJ {\n  0% {\n    top: 1.1875em;\n    left: 0.0625em;\n    width: 0;\n  }\n  54% {\n    top: 1.0625em;\n    left: 0.125em;\n    width: 0;\n  }\n  70% {\n    top: 2.1875em;\n    left: -0.375em;\n    width: 3.125em;\n  }\n  84% {\n    top: 3em;\n    left: 1.3125em;\n    width: 1.0625em;\n  }\n  100% {\n    top: 2.8125em;\n    left: 0.8125em;\n    width: 1.5625em;\n  }\n}\n@keyframes anim-sll___VWeIJ {\n  0% {\n    top: 3.375em;\n    right: 2.875em;\n    width: 0;\n  }\n  65% {\n    top: 3.375em;\n    right: 2.875em;\n    width: 0;\n  }\n  84% {\n    top: 2.1875em;\n    right: 0;\n    width: 3.4375em;\n  }\n  100% {\n    top: 2.375em;\n    right: 0.5em;\n    width: 2.9375em;\n  }\n}\n.error-icon___cVxX2 {\n  color: #f27474;\n  border-color: rgba(242, 116, 116, 0.7);\n  animation: anim-err___mikYI 0.5s;\n}\n.error-icon___cVxX2 .error-ring___f20Hs {\n  flex-grow: 1;\n  height: 100%;\n  animation: anim-err-l___ANNSG 0.5s;\n}\n.error-icon___cVxX2 .error-ring___f20Hs .error-line-left___l7yQ1 {\n  position: absolute;\n  top: 2.3125em;\n  left: 1.0625em;\n  display: block;\n  width: 2.9375em;\n  height: 0.3125em;\n  background-color: #f27474;\n  border-radius: 0.125em;\n  transform: rotate(45deg);\n}\n.error-icon___cVxX2 .error-ring___f20Hs .error-line-right___orxiR {\n  position: absolute;\n  top: 2.3125em;\n  right: 1em;\n  display: block;\n  width: 2.9375em;\n  height: 0.3125em;\n  background-color: #f27474;\n  border-radius: 0.125em;\n  transform: rotate(-45deg);\n}\n\n@keyframes anim-err___mikYI {\n  0% {\n    opacity: 0;\n    transform: rotateX(100deg);\n  }\n  100% {\n    opacity: 1;\n    transform: rotateX(0deg);\n  }\n}\n@keyframes anim-err-l___ANNSG {\n  0% {\n    margin-top: 1.625em;\n    opacity: 0;\n    transform: scale(0.4);\n  }\n  50% {\n    margin-top: 1.625em;\n    opacity: 0;\n    transform: scale(0.4);\n  }\n  80% {\n    margin-top: -0.375em;\n    transform: scale(1.15);\n  }\n  100% {\n    margin-top: 0;\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.warn-icon___xtZIC {\n  color: #f8bb86;\n  border-color: rgba(250, 206, 168, 0.7);\n  animation: anim-err___mikYI 0.5s;\n}\n.warn-icon___xtZIC .warn-content___eOKBq {\n  display: flex;\n  align-items: center;\n  font-size: 3.75em;\n  animation: anim-warn___2uVJr 0.8s;\n}\n\n@keyframes anim-warn___2uVJr {\n  0% {\n    opacity: 0;\n    transform: rotateZ(45deg);\n  }\n  25% {\n    opacity: 0.4;\n    transform: rotateZ(-25deg);\n  }\n  50% {\n    opacity: 0.8;\n    transform: rotateZ(15deg);\n  }\n  75% {\n    opacity: 1;\n    transform: rotateZ(-5deg);\n  }\n  100% {\n    opacity: 1;\n    transform: rotateX(0);\n  }\n}\n.info-icon___6kWTo {\n  color: #3fc3ee;\n  border-color: rgba(157, 224, 246, 0.7);\n  animation: anim-err___mikYI 0.5s;\n}\n.info-icon___6kWTo .info-content___xXmH4 {\n  display: flex;\n  align-items: center;\n  font-size: 3.75em;\n  animation: anim-warn___2uVJr 0.8s;\n}\n\n.loading-icon___0IUQl {\n  line-height: 1;\n  border-color: transparent;\n}\n.loading-icon___0IUQl i {\n  font-size: 5.4em;\n}\n\n.icon___-ocR3.dense-icon___ULz7V {\n  align-self: center;\n  width: 2em;\n  min-width: 2em;\n  height: 2em;\n  border-width: 0.25em;\n}\n.icon___-ocR3.dense-icon___ULz7V.loading-icon___0IUQl i {\n  font-size: 2.25em;\n}\n.icon___-ocR3.dense-icon___ULz7V .success-ring-2___wZUBn {\n  top: -0.25em;\n  left: -0.25em;\n  width: 2em;\n  height: 2em;\n  border-width: 0.25em;\n}\n.icon___-ocR3.dense-icon___ULz7V .success-line___ukGjE {\n  height: 0.25em;\n}\n.icon___-ocR3.dense-icon___ULz7V .success-line___ukGjE.line-tip___6T045 {\n  top: 1.1em;\n  left: 0.22em;\n  width: 0.75em;\n  animation: anim-slt-dense___Grukt 0.75s;\n}\n.icon___-ocR3.dense-icon___ULz7V .success-line___ukGjE.line-long___vHhdy {\n  top: 0.9em;\n  right: 0.15em;\n  width: 1.3em;\n  animation: anim-sll-dense___IRq25 0.75s;\n}\n.icon___-ocR3.dense-icon___ULz7V .error-line-left___l7yQ1,\n.icon___-ocR3.dense-icon___ULz7V .error-line-right___orxiR {\n  top: 0.875em;\n  width: 1.5em;\n  height: 0.25em;\n}\n.icon___-ocR3.dense-icon___ULz7V .error-line-left___l7yQ1 {\n  left: 0.25em;\n}\n.icon___-ocR3.dense-icon___ULz7V .error-line-right___orxiR {\n  right: 0.25em;\n}\n.icon___-ocR3.dense-icon___ULz7V .warn-content___eOKBq,\n.icon___-ocR3.dense-icon___ULz7V .info-content___xXmH4,\n.icon___-ocR3.dense-icon___ULz7V .question-content___8EBDF {\n  font-size: 1.75em;\n  font-weight: bold;\n}\n\n@keyframes anim-slt-dense___Grukt {\n  0% {\n    top: 0.5625em;\n    left: 0.0625em;\n    width: 0;\n  }\n  54% {\n    top: 0.25em;\n    left: 0.13em;\n    width: 0;\n  }\n  70% {\n    top: 0.7em;\n    left: -0.14em;\n    width: 1.4em;\n  }\n  84% {\n    top: 1.18em;\n    left: 0.3em;\n    width: 0.7em;\n  }\n  100% {\n    top: 1.1em;\n    left: 0.22em;\n    width: 0.75em;\n  }\n}\n@keyframes anim-sll-dense___IRq25 {\n  0% {\n    top: 1.6em;\n    right: 1.3em;\n    width: 0;\n  }\n  65% {\n    top: 1em;\n    right: 1em;\n    width: 0;\n  }\n  84% {\n    top: 0.91em;\n    right: 0;\n    width: 1.45em;\n  }\n  100% {\n    top: 0.9em;\n    right: 0.15em;\n    width: 1.3em;\n  }\n}";
  var styles$5 = {"icon":"icon___-ocR3","success-icon":"success-icon___M1xKk","success-ring":"success-ring___ZGOdP","rt-rscl":"rt-rscl___M-0L3","success-fix":"success-fix___ljEoa","success-line":"success-line___ukGjE","line-tip":"line-tip___6T045","anim-slt":"anim-slt___Cp4aJ","line-long":"line-long___vHhdy","anim-sll":"anim-sll___VWeIJ","error-icon":"error-icon___cVxX2","anim-err":"anim-err___mikYI","error-ring":"error-ring___f20Hs","anim-err-l":"anim-err-l___ANNSG","error-line-left":"error-line-left___l7yQ1","error-line-right":"error-line-right___orxiR","warn-icon":"warn-icon___xtZIC","warn-content":"warn-content___eOKBq","anim-warn":"anim-warn___2uVJr","info-icon":"info-icon___6kWTo","info-content":"info-content___xXmH4","loading-icon":"loading-icon___0IUQl","dense-icon":"dense-icon___ULz7V","success-ring-2":"success-ring-2___wZUBn","anim-slt-dense":"anim-slt-dense___Grukt","anim-sll-dense":"anim-sll-dense___IRq25","question-content":"question-content___8EBDF"};
  styleInject(css_248z$6);

  var css_248z$5 = "@charset \"UTF-8\";\n.animate-turn___HyJtE {\n  animation: message-turn___ycjUm 1s linear infinite;\n}\n\n.icon___eLUlc {\n  line-height: 1;\n}\n.icon___eLUlc svg {\n  width: 1em;\n  height: 1em;\n  vertical-align: baseline;\n}\n\n.close___mosyV {\n  cursor: pointer;\n  opacity: 0.4;\n  transition: all 0.2s;\n}\n.close___mosyV:hover {\n  opacity: 0.8;\n}\n\n/* loading的转动 */\n@keyframes message-turn___ycjUm {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}";
  var styles$4 = {"animate-turn":"animate-turn___HyJtE","message-turn":"message-turn___ycjUm","icon":"icon___eLUlc","close":"close___mosyV"};
  styleInject(css_248z$5);

  // info, warning, error, success, loading, close
  const Icons = [`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" style="fill:#29abe2"/><path d="M12,17.5a1,1,0,0,1-1-1v-5h-.5a1,1,0,0,1,0-2H12a1,1,0,0,1,1,1v6A1,1,0,0,1,12,17.5Z" style="fill:#fff"/><path d="M14,18.5H10a1,1,0,0,1,0-2h4a1,1,0,0,1,0,2Z" style="fill:#fff"/><circle cx="12" cy="6" r="1.5" style="fill:#fff"/></svg>`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" style="fill:#faad14"/><path d="M12,19.5A1.5,1.5,0,1,0,10.5,18,1.5,1.5,0,0,0,12,19.5Z" style="fill:#fff;fill-rule:evenodd"/><path d="M12,14a1.5,1.5,0,0,1-1.5-1.5v-7a1.5,1.5,0,0,1,3,0v7A1.5,1.5,0,0,1,12,14Z" style="fill:#fff"/></svg>`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" style="fill:#f5222d"/><path d="M16.5,7.5l-9,9" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px"/><path d="M7.5,7.5l9,9" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px"/></svg>`, '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,.5l3.18,2.2h3.93l1.21,3.55,3.18,2.2L22.28,12l1.22,3.55-3.18,2.2L19.11,21.3H15.18L12,23.5,8.82,21.3H4.89L3.68,17.75.5,15.55,1.72,12,.5,8.45l3.18-2.2L4.89,2.7H8.82Z" style="fill:#52c41a;stroke:#52c41a;stroke-linecap:round;stroke-linejoin:round"/><path d="M7.5,12l3,3,6-6" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg>', `<svg class="${styles$4['animate-turn']}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M1,12A11,11,0,0,0,12,23h0A11,11,0,0,0,12,1" style="fill:none;stroke:#1890ff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><path d="M18.5,12A6.5,6.5,0,1,0,12,18.5h0" style="fill:none;stroke:#1890ff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg>`, '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2,2,22,22" style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:4px"/><path d="M2,22,22,2" style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:4px"/></svg>'];
  function svgIcon(index, className = '') {
    return `<i class="${styles$4.icon} ${className} ${index === 5 ? styles$4.close : ''}">${Icons[index]}</i>`;
  }

  function SuccessIcon(dense = false, className = '') {
    return `<div class="${styles$5.icon} ${styles$5['success-icon']} ${dense ? styles$5['dense-icon'] : ''} ${className}"><div class="${styles$5['success-line']} ${styles$5['line-tip']}"></div><div class="${styles$5['success-line']} ${styles$5['line-long']}"></div><div class="${styles$5['success-ring']}"></div><div class="${styles$5['success-fix']}"></div></div>`;
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
    const icon = svgIcon(4);
    return `<div class="${styles$5.icon} ${styles$5['loading-icon']} ${dense ? styles$5['dense-icon'] : ''} ${className}">${icon}</div>`;
  }

  const iconSets = ['info', 'warning', 'error', 'success', 'loading', 'close'];

  // info, warning, error, success, loading
  function AnimatedIcon(type, dense = false, className) {
    switch (type) {
      case iconSets[3]:
        return SuccessIcon(dense, className);
      case iconSets[2]:
        return ErrorIcon(dense, className);
      case iconSets[1]:
        return WarnIcon(dense, className);
      case iconSets[0]:
        return InfoIcon(dense, className);
      case iconSets[4]:
        return LoadingIcon(dense, className);
      default:
        return SuccessIcon(dense, className);
    }
  }

  // info, warning, error, success, loading, close
  function SvgIcon(type, className) {
    return svgIcon(iconSets.indexOf(type || 'success'), className);
  }

  var css_248z$4 = "@charset \"UTF-8\";\n/* 获取颜色 */\n.alert___Su0Xe {\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  min-width: 350px;\n  padding: 1rem;\n  pointer-events: all;\n  background: var(--gma-bg);\n  border-radius: 5px;\n  box-shadow: var(--gma-shadow-v);\n  animation: alert-show___fKZw2 0.3s;\n  animation-fill-mode: both;\n}\n\n.alert-icon___Wi1df {\n  margin: 0 auto;\n}\n\n.alert-btn-group___uvh-2 {\n  display: flex;\n  justify-content: center;\n  margin-top: 1rem;\n}\n.alert-btn-group___uvh-2 .alert-btn___AgfUF {\n  padding: 0.625em 1.1em;\n  margin: 0.3125em;\n  font-size: 1em;\n  font-weight: 500;\n  color: #fff;\n  cursor: pointer;\n  background: transparent none repeat 0 0 / auto auto padding-box border-box scroll;\n  background: initial;\n  background-color: #7066e0;\n  border: 0;\n  border-radius: 0.25em;\n}\n.alert-btn-group___uvh-2 .alert-btn___AgfUF:hover {\n  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));\n}\n\n.alert-content___3l0Cr {\n  z-index: 1;\n  margin: 1em 1.6em 0.3em;\n  overflow: auto;\n  font-size: 1.125em;\n  color: inherit;\n  text-align: center;\n  word-break: break-word;\n  word-wrap: break-word;\n}\n\n.alert-title___-WvmC {\n  position: relative;\n  max-width: 100%;\n  padding: 0.8em 1em 0;\n  margin: 0;\n  font-size: 1.875em;\n  font-weight: 600;\n  color: inherit;\n  text-align: center;\n  text-transform: none;\n  word-wrap: break-word;\n}\n\n.alert-close___vIbaH {\n  position: absolute;\n  top: 6px;\n  right: 6px;\n}\n\n@keyframes alert-show___fKZw2 {\n  0% {\n    transform: scale(0.7);\n  }\n  45% {\n    transform: scale(1.05);\n  }\n  80% {\n    transform: scale(0.95);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n@keyframes alert-hide___ZbDx6 {\n  0% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(0.5);\n  }\n}";
  var styles$3 = {"alert":"alert___Su0Xe","alert-show":"alert-show___fKZw2","alert-icon":"alert-icon___Wi1df","alert-btn-group":"alert-btn-group___uvh-2","alert-btn":"alert-btn___AgfUF","alert-content":"alert-content___3l0Cr","alert-title":"alert-title___-WvmC","alert-close":"alert-close___vIbaH","alert-hide":"alert-hide___ZbDx6"};
  styleInject(css_248z$4);

  function Button(text, onClick) {
    const $btn = document.createElement('button');
    $btn.textContent = text;
    $btn.onclick = onClick;
    $btn.classList.add(styles$3['alert-btn']);
    return $btn;
  }
  function GmAlert$1(props) {
    const type = props.type || 'info';
    const $wrapper = newDiv(styles$3.alert);
    const icon = AnimatedIcon(type, false, styles$3['alert-icon']);
    $wrapper.innerHTML = `${icon}<div class="${styles$3['alert-title']}">${props.content}</div>`;
    if (props.text) {
      const $text = newDiv(styles$3['alert-content']);
      $text.textContent = props.text;
      $wrapper.append($text);
    }
    const $root = getRoot(2);
    const open = () => {
      $root.append($wrapper);
      return new Promise(resolve => {
        const handle = animationName => {
          if (animationName === styles$3['alert-show']) {
            resolve();
            return true;
          }
          return false;
        };
        animationendHandle($wrapper, handle);
      });
    };
    const close = status => {
      changeAnimation($wrapper, styles$3['alert-hide']);
      return new Promise(resolve => {
        const handle = e => {
          if (e === styles$3['alert-hide']) {
            $wrapper.remove();
            props.onClosed(status);
            resolve();
            return true;
          }
          return false;
        };
        animationendHandle($wrapper, handle);
      });
    };
    if (props.showCancel || props.showConfirm) {
      const $buttons = newDiv(styles$3['alert-btn-group']);
      props.showCancel && $buttons.append(Button('取消', () => {
        close(0);
      }));
      props.showConfirm && $buttons.append(Button('确定', () => {
        close(1);
      }));
      $wrapper.append($buttons);
    }
    if (props.showClose) {
      const $close = newDiv();
      $close.innerHTML = SvgIcon('close', styles$3['alert-close']);
      $close.onclick = () => {
        close(0);
      };
      $wrapper.append($close);
    }
    return {
      close,
      open,
      $el: $wrapper
    };
  }

  var css_248z$3 = "@charset \"UTF-8\";\n/* 获取颜色 */\n.info___51U1X {\n  position: absolute;\n  right: 2em;\n  bottom: 1.5em;\n  display: flex;\n  flex-direction: column;\n  width: 21em;\n  pointer-events: all;\n  background: var(--gma-bg);\n  border-radius: 5px;\n  box-shadow: var(--gma-shadow-v);\n  animation: 0.3s info-move-in___XAlMs cubic-bezier(0.42, 0, 0.3, 1.11);\n}\n\n.info-header___cUSk2 {\n  display: flex;\n  align-items: center;\n  padding: 6px;\n  border-bottom: var(--gma-border);\n}\n\n.info-close___jIgt3 {\n  margin-left: 0.5em;\n  font-size: 1em;\n}\n\n.info-status___0TBsJ {\n  width: 1.2em;\n  height: 1.2em;\n  margin-right: 0.5em;\n  border-radius: 4px;\n}\n\n.info-content___FYDoM {\n  padding: 10px 1em;\n}\n\n@keyframes info-move-in___XAlMs {\n  0% {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes info-move-out___yd8AG {\n  100% {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n}";
  var styles$2 = {"info":"info___51U1X","info-move-in":"info-move-in___XAlMs","info-header":"info-header___cUSk2","info-close":"info-close___jIgt3","info-status":"info-status___0TBsJ","info-content":"info-content___FYDoM","info-move-out":"info-move-out___yd8AG"};
  styleInject(css_248z$3);

  const ColorMap = {
    info: '#409eff',
    success: '#67c23a',
    warning: '#e6a23c',
    error: '#f56c6c'
  };
  function GmInformation(props) {
    const color = ColorMap[props.type || 'info'] || ColorMap.info;
    const $wrapper = newDiv(styles$2.info);
    $wrapper.innerHTML = `<div class="${styles$2['info-header']}"><div class="${styles$2['info-status']}" style="background:${color};"></div><span style="margin-right:auto;font-weight:600">${props.headerLeft || '公告'}</span><span style="font-size:.875em;opacity:.7">${props.headerRight || ''}</span>${props.showClose ? SvgIcon('close', styles$2['info-close']) : ''}</div>` + `<div class="${styles$2['info-content']}">${props.content}</div>`;
    const open = () => {
      getRoot(2).append($wrapper);
      return new Promise(resolve => {
        const handle = e => {
          if (e === styles$2['info-move-in']) {
            resolve();
            return true;
          }
          return false;
        };
        animationendHandle($wrapper, handle);
      });
    };
    const close = status => {
      return new Promise(resolve => {
        changeAnimation($wrapper, styles$2['info-move-out']);
        const handle = e => {
          if (e === styles$2['info-move-out']) {
            $wrapper.remove();
            props.onClosed(status);
            resolve();
            return true;
          }
          return false;
        };
        animationendHandle($wrapper, handle);
      });
    };
    if (props.showClose) {
      const $close = $wrapper.querySelector(`.${styles$2['info-close']}`);
      $close.onclick = () => {
        close(0);
      };
    }
    return {
      open,
      close,
      $el: $wrapper
    };
  }

  var css_248z$2 = "@charset \"UTF-8\";\n/* 获取颜色 */\n.msg___HocBn {\n  position: relative;\n  overflow: visible;\n  transform-origin: center;\n  animation-duration: 0.3s;\n}\n.msg___HocBn > :nth-child(2) {\n  opacity: 0;\n}\n.msg___HocBn .icon___kbi0p {\n  position: absolute;\n  top: 9px;\n  left: 8px;\n  font-size: 16px;\n}\n.msg___HocBn .msg-main___ap8Hy {\n  position: relative;\n  box-sizing: border-box;\n  min-width: 3rem;\n  max-width: 20em;\n  padding: 8px;\n  padding-left: 30px;\n  margin-bottom: 0.4rem;\n  overflow: hidden;\n  text-align: center;\n  background: var(--gma-bg);\n  border-radius: 4px;\n  box-shadow: var(--gma-shadow-v);\n  /* 从中间开始放大 */\n  transform-origin: center;\n  animation-duration: 0.3s;\n}\n.msg___HocBn .msg-content___9Svp7 {\n  text-align: left;\n  pointer-events: all;\n  /* 解决字体模糊抖动问题 */\n  transform: perspective(1px);\n}\n\n@keyframes msg-moveout___v-7Kq {\n  0% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(0.7);\n  }\n}\n@keyframes msg-out___ca1cd {\n  100% {\n    max-height: 0;\n    padding-top: 0;\n    padding-bottom: 0;\n    margin-bottom: 0;\n  }\n}\n@keyframes msg-movein___6htRb {\n  0% {\n    opacity: 0;\n    transform: scale(0.5);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}";
  var styles$1 = {"msg":"msg___HocBn","icon":"icon___kbi0p","msg-main":"msg-main___ap8Hy","msg-content":"msg-content___9Svp7","msg-moveout":"msg-moveout___v-7Kq","msg-out":"msg-out___ca1cd","msg-movein":"msg-movein___6htRb"};
  styleInject(css_248z$2);

  const MessageState = {
    opening: styles$1['msg-movein'],
    done: '',
    closing: styles$1['msg-moveout']
  };
  function GmMessage(props) {
    const icon = SvgIcon(props.type, styles$1.icon);
    const $wrapper = newDiv(styles$1.msg);
    const $main = newDiv(styles$1['msg-main']);
    $wrapper.append($main);
    $main.innerHTML = `${icon}<div class=${styles$1['msg-content']}>${props.content}</div>`;
    const open = () => {
      getRoot(0).append($wrapper);
      changeAnimation($wrapper, MessageState.opening);
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
    const close = status => {
      $main.style.maxHeight = `${$main.offsetHeight}px`;
      changeAnimation($wrapper, MessageState.closing);
      changeAnimation($main, styles$1['msg-out']);
      return new Promise(resolve => {
        const handle = e => {
          if (e === MessageState.closing) {
            $wrapper.remove();
            props.onClosed(status);
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

  var css_248z$1 = "@charset \"UTF-8\";\n/* 获取颜色 */\n.notice___xJTn2 {\n  position: relative;\n  width: 20rem;\n  margin-bottom: 1em;\n  background: var(--gma-bg);\n  border-radius: 5px;\n  box-shadow: var(--gma-shadow-v);\n  opacity: 0;\n  transform-origin: top center;\n  animation-duration: 0.25s;\n}\n.notice___xJTn2 .notice-main___YXiGH {\n  display: flex;\n  flex-direction: column;\n  align-items: normal;\n}\n.notice___xJTn2 .notice-main___YXiGH .notice-content___ysok2 {\n  position: relative;\n  margin: 1rem 1rem 1.2rem 3.4rem;\n}\n.notice___xJTn2 .notice-icon___MvUBU {\n  position: absolute;\n  top: 0.7rem;\n  left: 1rem;\n}\n\n/* notice进入 */\n@keyframes notice-movein___M8YUM {\n  0% {\n    opacity: 0;\n    transform: translateX(100%);\n  }\n  50% {\n    opacity: 0.75;\n  }\n  100% {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n/* notice退出 */\n@keyframes notice-moveout___vwgYy {\n  0% {\n    opacity: 1;\n  }\n  60% {\n    opacity: 0;\n    transform: translateX(100%);\n  }\n  100% {\n    max-height: 0;\n    margin: 0;\n    opacity: 0;\n  }\n}";
  var styles = {"notice":"notice___xJTn2","notice-main":"notice-main___YXiGH","notice-content":"notice-content___ysok2","notice-icon":"notice-icon___MvUBU","notice-movein":"notice-movein___M8YUM","notice-moveout":"notice-moveout___vwgYy"};
  styleInject(css_248z$1);

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
      getRoot(1).prepend($wrapper);
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
    const close = status => {
      return new Promise(resolve => {
        changeStyle($wrapper, [`max-height:${$wrapper.offsetHeight + 10}px`, `animation-name:${noticeState.closing}`]);
        const handle = e => {
          if (e === noticeState.closing) {
            $wrapper.remove();
            props.onClosed(status);
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

    // 0:'msg' | 1:'notice' | 2:'alert' | 3:'information'

    constructor(form) {
      this.form = form;
      if (form > 1) {
        this.timeout = 0;
      }
    }
    config(config) {
      this.timeout = config.timeout || this.timeout;
      this.maxCount = config.maxCount || this.maxCount;
    }
    fire(text, type, conf) {
      const oMsg = this.mkMsg(text, type || 'success', conf);
      if (type !== 'loading') {
        this.sT(oMsg, conf?.timeout || this.timeout);
      }
      return oMsg;
    }

    // 设置定时
    sT(oMsg, timeout) {
      if (!timeout) return;
      const {
        $el
      } = oMsg;
      let p = oMsg.progress;
      p ??= this.mkP(oMsg, timeout);
      p.reset();
      $el.onmouseenter = p.pause;
      $el.onmouseleave = p.resume;
    }

    // 设置进度
    mkP(oMsg, timeout) {
      const {
        $el
      } = oMsg;
      const $progress = newDiv(styles$6['gmsg-progress']);
      const $progressBar = newDiv(styles$6['gmsg-progress-bar']);
      $progress.append($progressBar);
      $el.append($progress);
      $progressBar.ontransitionend = () => {
        oMsg.close(-1);
      };
      const get = () => {
        return $progressBar.clientWidth / $progress.clientWidth;
      };
      const pause = () => {
        changeStyle($progressBar, ['transition:none', `width:${get() * 100}%`]);
      };

      // eslint-disable-next-line require-await
      const resume = async () => {
        changeStyle($progressBar, ['width:0', `transition:width ${timeout * get()}ms linear`]);
      };
      const reset = () => {
        changeStyle($progressBar, ['width:100%', 'transition:none']);
        resume();
      };
      return oMsg.progress = {
        pause,
        resume,
        reset,
        get
      };
    }

    // 判断消息是否存在, 设置msgCount以及关闭多余消息
    mkMsg(content, type, conf) {
      const id = `${content}${type}`;
      if (this.form < 2 && this.activeInsts.has(id)) {
        const inst = this.activeInsts.get(id);
        inst.count += 1;
        setMsgCount(inst.$el, inst.count);
        return inst;
      }
      const props = {
        ...conf,
        content,
        type,
        onClosed: status => {
          this.form < 2 && this.activeInsts.delete(id);
          conf?.onClosed && conf.onClosed(status);
        }
      };
      let inst;
      switch (this.form) {
        case 0:
          inst = GmMessage(props);
          break;
        case 1:
          inst = GmNotice(props);
          break;
        case 2:
          inst = GmAlert$1(props);
          break;
        case 3:
          inst = GmInformation(props);
          break;
        default:
          inst = GmMessage(props);
          break;
      }
      if (this.form < 2) {
        this.activeInsts.size >= this.maxCount && this.activeInsts.values().next().value.close(-2);
      } else {
        // 关闭所有消息
        this.activeInsts.values().next().value?.close(-2);
        this.activeInsts.clear();
      }
      const oMsg = {
        ...inst,
        identifer: id,
        count: 1
      };
      this.activeInsts.set(id, oMsg);
      inst.open();
      return oMsg;
    }
  }

  var css_248z = "@charset \"UTF-8\";\n/* 获取颜色 */\n.gmalert-global-vars {\n  --gma-bg: #fff;\n  --gma-text: #707070;\n  --gma-light: #d4d4d4;\n  --gma-border: 1px solid #d3d3d3;\n  --gma-shadow: rgba(0, 0, 0, 0.08);\n  --gma-shadow-v: 0 0 1px var(--gma-shadow), 0 1px 2px var(--gma-shadow), 1px 2px 4px var(--gma-shadow), 1px 3px 8px var(--gma-shadow), 2px 4px 16px var(--gma-shadow);\n  font-size: 13px;\n  line-height: 1.3;\n  color: #707070;\n  color: var(--gma-text);\n}";
  styleInject(css_248z);

  function MakeMsg(form) {
    const $msg = new Msg(form);
    const res = (content, type, conf) => {
      return $msg.fire(content, type, conf);
    };
    res.config = $msg.config.bind($msg);
    return res;
  }
  const alert = MakeMsg(2);
  const information = MakeMsg(3);
  const message = MakeMsg(0);
  const notice = MakeMsg(1);
  const GmAlert = {
    alert,
    message,
    notice,
    information
  };

  return GmAlert;

})();
//# sourceMappingURL=index.js.map
