// dom.js用来保存通用的dom操作函数
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return;
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}

export function removeClass(el, className) {
  if (!hasClass(el, className)) {
    return;
  }
  let newClassList = el.className.split(' ');
  newClassList.splice(newClassList.indexOf(className), 1);
  el.className = newClassList.join(' ');
}

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
}

export function getData(el, name, val) {
  const prefix = 'data-';
  name = prefix + name;
  if (val) {
    return el.setAttribute(name, val);
  } else {
    return el.getAttribute(name);
  }
}

// 能力检测，判断浏览器支持哪种前缀
let elementStyle = document.createElement('div').style;
// 利用IIFE得到支持的前缀
let vendor = (() => {
  // 利用transform做能力检测，来判断支持哪种前缀
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  };

  for (let key in transformNames) {
    // 支持某种前缀则直接返回
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }

  // 如果没有匹配，则返回false
  return false;
})();

// 添加前缀
export function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }
  // 支持标准，则直接返回
  if (vendor === 'standard') {
    return style;
  }
  // 否则返回prefix后的字符串
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

// 获取元素尺寸
export function getRect(el) {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}
