/**
 * MSlide.js
 * @Author  Travis
 * @Contact https://github.com/godxiaoji/mslide
 * @Version 0.0.6
 */
"use strict";

// Module definition pattern used is returnExports from https://github.com/umdjs/umd
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.MSlide = factory();
  }
}(typeof self !== 'undefined' ? self : this, (function () {
  var navigator = window.navigator,
    userAgent = navigator.userAgent.toLowerCase();

  var isMobile = 'ontouchstart' in document.documentElement;
  var isAndroid = /android/i.test(userAgent);

  var touchstart = isMobile ? 'touchstart' : 'mousedown',
    touchmove = isMobile ? 'touchmove' : 'mousemove',
    touchend = isMobile ? 'touchend' : 'mouseup',
    mouseover = 'mouseover',
    mouseout = 'mouseout';

  function noop () { }

  // 样式修正
  var Style = {
    // 样式前缀
    prefix: (function () {
      var vendors = 't,webkitT,MozT,msT,OT'.split(','),
        style = document.createElement('div').style,
        t, i = 0;
      for (; i < vendors.length; i++) {
        t = vendors[i] + 'ransform';
        if (t in style) {
          style = null;
          return vendors[i].substr(0, vendors[i].length - 1);
        }
      }
      style = null;
      return '';
    })(),
    // 加入样式前缀，css和js驼峰式
    addPrefix: function (style, camel) {
      if (this.prefix === '') {
        return style;
      }
      return camel ?
        (this.prefix + style.charAt(0).toUpperCase() + style.substr(1)) :
        ('-' + this.prefix.toLowerCase() + '-' + style);
    },
    // 获取滑动距离值
    getTransVal: function (size, direction) {
      return 'translate3d(' + (direction === 'x' ? size + 'px, 0px, 0px' : '0px, ' + size + 'px, 0px') + ')';
    },
    // 设置样式
    set: function (elem, obj) {
      for (var i in obj) {
        elem.style[i] = obj[i];
      }
    }
  };

  // 获取完整样式
  var cssTransform = Style.addPrefix('transform'),
    // cssTransition = Style.addPrefix('transition'),
    transform = Style.addPrefix('transform', true),
    transition = Style.addPrefix('transition', true),
    transitionDuration = Style.addPrefix('transitionDuration', true);

  function Slide (options) {
    // 设置配置
    this.options = options || {};

    // 获取包裹元素
    this.$wrapper = typeof this.options.selector === 'string' ?
      document.querySelector(this.options.selector) :
      this.options.selector;

    if (!this.$wrapper || this.$wrapper.nodeType !== 1) {
      throw new Error('通过"selector"获取不到相应元素');
    }

    // 获取列表元素
    this.$list = this.options.listSelector ?
      this.$wrapper.querySelector(this.options.listSelector) :
      this.$wrapper.firstElementChild;

    if (!this.$list || this.$list.nodeType !== 1) {
      throw new Error('获取不到列表元素');
    }

    // 添加滑动事件
    this.$wrapper.addEventListener(touchstart, this, false);
    if (!isMobile) {
      this.$wrapper.addEventListener(mouseover, this, false);
      this.$wrapper.addEventListener(mouseout, this, false);
    }

    // 获取上一页按钮
    if (this.options.prevSelector) {
      this.$prevBtn = typeof this.options.prevSelector === 'string' ?
        document.querySelector(this.options.prevSelector) :
        this.options.prevSelector;
      this.$prevBtn.addEventListener('click', this, false);
    }
    // 获取下一页按钮
    if (this.options.nextSelector) {
      this.$nextBtn = typeof this.options.nextSelector === 'string' ?
        document.querySelector(this.options.nextSelector) :
        this.options.nextSelector;
      this.$nextBtn.addEventListener('click', this, false);
    }

    // 检测屏幕变化
    window.addEventListener('resize', this, false)

    this.$wrapper._Slide = this;

    // 更新实时设定
    this.update(this.options);
  };

  Slide.prototype = {
    // 是否自动播放（配合幻灯片用）
    autoPlay: false,
    // 滑动中
    playing: false,
    // 切换间隔
    interval: 4000,
    // 动画间隔
    duration: 100,
    // 当前index
    index: 0,
    // 元素宽度
    itemSize: 0,
    // 获取items最后索引
    getLastIndex: function () {
      return this.$items.length - 1;
    },
    // 获取循环的索引
    getCircleIndex: function (step) {
      var length = this.$items.length;
      return (this.index + length + step % length) % length;
    },
    // 更新实时设定
    update: function (options) {
      var self = this;

      if (typeof options !== 'object') {
        options = {};
      }

      this.options = options;

      // 跟随，渐变不开启跟随
      this.follow = (this.options.follow === false || this.slideType === 'fade') ? false : true;

      // 设置方向
      if (this.options.direction === 'y') {
        this.direction = 'y';
        this.directionGroup = ['Y', 'X', 'Height', 'Width'];
      } else {
        this.direction = 'x';
        this.directionGroup = ['X', 'Y', 'Width', 'Height'];
      }

      // 设置动画效果
      var easeMap = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'];
      this.easing = easeMap[1];
      easeMap.forEach(function (val) {
        if (val === self.options.easing) {
          self.easing = val;
        }
      });

      // 自定义设置
      var cusMap = ['index', 'onBeforeSlide', 'onSlide', 'autoPlay', 'interval', 'duration', 'slideType'];
      cusMap.forEach(function (val) {
        if (self.options[val] != null) {
          self[val] = self.options[val];
        }
      });

      // 重设列表
      this.setItems();

      // 滑动到指定位置
      this.to(options.index || this.index);

      this.stop();
      if (this.autoPlay) {
        this.start();
      }
    },
    // 设置列表项
    setItems: function () {
      this.$items = [].slice.call(this.$list.children, 0);

      if (this.slideType === 'fade') {
        this.setFadeStyle();
        return;
      }
      this.setSlideStyle();
    },
    // 设置渐变属性
    setFadeStyle: function () {
      var self = this,
        width = this.$list.offsetWidth,
        height = this.$list.offsetHeight;

      this.$list.style.width = width + 'px';
      this.$list.style.height = height + 'px';

      this.$items.forEach(function (item, i) {
        var styleObj = {
          position: 'absolute',
          left: 0,
          top: 0,
          width: width + 'px',
          height: height + 'px',
          opacity: (i === 0 ? 1 : 0)
        };
        styleObj[transform] = Style.getTransVal(0, this.direction);
        styleObj[transition] = 'opacity 0ms ' + self.easing;
        Style.set(item, styleObj);
      });
    },
    // 设置滑动属性
    setSlideStyle: function () {
      // 设置滑动样式属性
      var sizeName = this.directionGroup[2],
        itemSize = this.$wrapper['offset' + sizeName],
        styleObj;

      this.itemSize = itemSize;
      this.$wrapper.style['overflow' + this.directionGroup[0]] = 'hidden';

      styleObj = {
        webkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        webkitPerspective: '1000',
        perspective: '1000'
      };
      styleObj[sizeName.toLowerCase()] = (itemSize * this.$items.length) + 'px';
      styleObj[transform] = Style.getTransVal(-itemSize * this.index, this.direction);
      styleObj[transition] = cssTransform + ' 0ms ' + this.easing;

      Style.set(this.$list, styleObj);

      this.$items.forEach(function (item) {
        item.style[sizeName.toLowerCase()] = itemSize + 'px';
      });
    },
    onMouseOver: function (e) {
      this.stop();
    },
    onMouseOut: function (e) {
      if (this.autoPlay) {
        this.start();
      }
      this.onTouchEnd(e)
    },
    onResize: function (e) {
      var self = this;

      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(function () {
        self.refresh();
      }, 100);
    },
    /* 事件 */
    // 事件处理
    handleEvent: function (e) {
      switch (e.type) {
        case touchstart:
          this.onTouchStart(e);
          break;
        case touchmove:
          this.onTouchMove(e);
          break;
        case touchend:
          this.onTouchEnd(e);
          break;
        case mouseover:
          this.onMouseOver(e);
          break;
        case mouseout:
          this.onMouseOut(e);
          break;
        case 'resize':
          this.onResize(e);
          break;
        case 'click':
          if (e.target == this.$prevBtn) {
            this.onPrevClick();
          } else if (e.target == this.$nextBtn) {
            this.onNextClick();
          }
          break;
      }
    },
    // 滑动前调用事件
    onBeforeSlide: noop,
    // 滑动后回调事件
    onSlide: noop,
    // 滑动开始事件-记录坐标
    onTouchStart: function (e) {
      var self = this;

      if (this.playing) {
        return;
      }

      // 清除幻灯片
      this.clear();
      if (isAndroid) {
        // 安卓兼容touchend监控失效
        // 3秒后认为滑动结束
        this.touchMoveTimeout = setTimeout(function () {
          self.resetStatus();
        }, 3000);
      }
      // 重置事件
      this.$wrapper.removeEventListener(touchmove, this, false);
      this.$wrapper.removeEventListener(touchend, this, false);
      this.$wrapper.addEventListener(touchmove, this, false);
      this.$wrapper.addEventListener(touchend, this, false);
      delete this.horizontal;
      // 记录坐标
      var touch = isMobile ? e.touches[0] : e;

      this.touchCoords = {};
      this.touchCoords.startX = touch.pageX;
      this.touchCoords.startY = touch.pageY;
      this.touchCoords.timeStamp = e.timeStamp;
    },
    // 滑动过程事件-判断横竖向，跟随滑动
    onTouchMove: function (e) {
      if (!this.touchCoords) {
        return;
      }

      var touch = isMobile ? e.touches[0] : e;
      this.touchCoords.stopX = touch.pageX;
      this.touchCoords.stopY = touch.pageY;

      var offsetX = this.touchCoords.startX - this.touchCoords.stopX,
        offsetY = this.touchCoords.startY - this.touchCoords.stopY;

      if (this.direction === 'y') {
        // 想个数值进行交换
        offsetX = [offsetY, offsetY = offsetX][0];
      };

      var absX = Math.abs(offsetX),
        absY = Math.abs(offsetY);

      if (typeof this.horizontal !== 'undefined') {
        // 首次
        if (offsetX !== 0) {
          // bug hack
          e.preventDefault();
        }
      } else {
        // 首次move确认是否水平移动
        if (absX > absY) {
          this.horizontal = true;
          if (offsetX !== 0) {
            e.preventDefault();
          }
          clearTimeout(this.touchMoveTimeout);
        } else {
          delete this.touchCoords;
          this.horizontal = false;
          return;
        }
      }

      if (!this.follow) {
        // 不跟随移动
        return;
      }

      var itemSize = this.itemSize,
        active = this.index,
        transSize = active * itemSize,
        last = this.getLastIndex();

      if ((active === 0 && offsetX < 0) || (active == last && offsetX > 0)) {
        transSize += Math.ceil(offsetX / Math.log(Math.abs(offsetX)));
      } else {
        transSize += offsetX;
      }
      if (absX < itemSize) {
        this.$list.style[transform] = Style.getTransVal(-transSize, this.direction);
      }
    },
    // 滑动结束事件-滑到指定位置，重置状态
    onTouchEnd: function (e) {
      clearTimeout(this.touchMoveTimeout);
      this.$wrapper.removeEventListener(touchmove, this, false);
      this.$wrapper.removeEventListener(touchend, this, false);

      if (this.touchCoords) {
        var itemSize = this.itemSize,
          offsetX = this.direction === 'x' ?
            this.touchCoords.startX - this.touchCoords.stopX :
            this.touchCoords.startY - this.touchCoords.stopY,
          absX = Math.abs(offsetX),
          active = this.index,
          transIndex;

        if (!isNaN(absX) && absX !== 0) {
          if (absX > itemSize) {
            absX = itemSize;
          }
          if (absX >= 80 || (e.timeStamp - this.touchCoords.timeStamp < 200)) {
            if (offsetX > 0) {
              transIndex = active + 1;
            } else {
              transIndex = active - 1;
            }
          } else {
            transIndex = active;
          }

          this.to(transIndex);
          delete this.touchCoords;
        }
      }
      this.resetStatus();
    },
    // 上一项点击事件
    onPrevClick: function () {
      this.clear();
      this.prev();
      if (this.autoPlay) {
        this.run();
      }
    },
    // 下一项点击事件
    onNextClick: function () {
      this.clear();
      this.next();
      if (this.autoPlay) {
        this.run();
      }
    },
    /* 滑动/动画 */
    // 跳转到上一项
    prev: function () {
      this.to(this.index - 1);
    },
    // 跳转到下一项
    next: function () {
      this.to(this.index + 1);
    },
    // 开始幻灯片
    start: function () {
      if (!this.running) {
        this.running = true;
        this.clear();
        this.run();
      }
    },
    // 结束幻灯片
    stop: function () {
      this.running = false;
      this.clear();
    },
    // 清除滑动状态
    clear: function () {
      clearTimeout(this.slideTimer);
      this.slideTimer = null;
    },
    // 启动自动滑动
    run: function () {
      var self = this;
      if (!this.slideTimer) {
        this.slideTimer = setInterval(function () {
          self.to(self.getCircleIndex(1));
        }, this.interval);
      }
    },
    // 恢复滑动状态
    resetStatus: function () {
      if (this.autoPlay) {
        this.run();
      }
    },
    // 到指定项
    to: function (toIndex) {
      var active = this.index;
      if (toIndex >= 0 && toIndex <= this.getLastIndex() && toIndex != active) {
        this.slide(toIndex);
      } else {
        this.slide(active);
      }
    },
    // 滑动实现
    slide: function (toIndex) {
      var self = this,
        fromIndex = this.index;

      if (this.playing) {
        return;
      }
      this.playing = true;
      this.index = toIndex;
      this.onBeforeSlide(toIndex, fromIndex);

      if (this.slideType === 'fade') {
        // 渐变模式
        var fadeIndex = toIndex >= fromIndex ? toIndex : fromIndex;

        this.$items[fadeIndex].style[transitionDuration] = this.duration + 'ms';
        this.$items[fadeIndex].style.opacity = toIndex >= fromIndex ? 1 : 0;
      } else {
        // 滑动模式
        this.$list.style[transitionDuration] = this.duration + 'ms';
        this.$list.style[transform] = Style.getTransVal(-this.itemSize * toIndex, this.direction);
      }

      setTimeout(function () {
        self.playing = false;
        if (self.slideType === 'fade') {
          self.$items[fadeIndex].style[transitionDuration] = '0ms';
        } else {
          self.$list.style[transitionDuration] = '0ms';
        }
        // 滑动回调
        self.onSlide(toIndex, fromIndex);
      }, this.duration);
    },
    // 刷新
    refresh: function () {
      this.setItems();
      var last = this.getLastIndex();
      if (this.index > last) {
        this.to(last);
      }
    },
    // 销毁
    destroy: function () {
      this.destroyed = true;
      this.stop();

      this.$wrapper.removeEventListener(touchstart, this, false);
      this.$wrapper.removeEventListener(touchmove, this, false);
      this.$wrapper.removeEventListener(touchend, this, false);
      this.$wrapper.removeEventListener(mouseout, this, false);
      if (!isMobile) {
        this.$wrapper.removeEventListener(mouseover, this, false);
        this.$wrapper.removeEventListener(mouseout, this, false);
      }
      this.$prevBtn && this.$prevBtn.removeEventListener('click', this, false);
      this.$nextBtn && this.$nextBtn.removeEventListener('click', this, false);
      this.$wrapper = this.$list = this.$items = this.$prevBtn = this.$nextBtn = null;
    }
  };

  return Slide;
})));
