!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("MSlide",[],e):"object"==typeof exports?exports.MSlide=e():t.MSlide=e()}(window,(function(){return function(t){var e={};function i(s){if(e[s])return e[s].exports;var o=e[s]={i:s,l:!1,exports:{}};return t[s].call(o.exports,o,o.exports,i),o.l=!0,o.exports}return i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(s,o,function(e){return t[e]}.bind(null,o));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){var s,o,n;"undefined"!=typeof self&&self,o=[],void 0===(n="function"==typeof(s=function(){"use strict";var t=window.navigator.userAgent.toLowerCase(),e="ontouchstart"in document.documentElement,i=/android/i.test(t),s=e?"touchstart":"mousedown",o=e?"touchmove":"mousemove",n=e?"touchend":"mouseup";function r(){}var h=!1;try{var a=Object.defineProperty({},"passive",{get:function(){return h=!0}});window.addEventListener("test",null,a)}catch(t){}var l=!!h&&{passive:!1},d={prefix:function(){for(var t="t,webkitT,MozT,msT,OT".split(","),e=document.createElement("div").style,i=0;i<t.length;i++)if(t[i]+"ransform"in e)return e=null,t[i].substr(0,t[i].length-1);return e=null,""}(),addPrefix:function(t,e){return""===this.prefix?t:e?this.prefix+t.charAt(0).toUpperCase()+t.substr(1):"-"+this.prefix.toLowerCase()+"-"+t},getTransVal:function(t,e){return"translate3d("+("x"===e?t+"px, 0px, 0px":"0px, "+t+"px, 0px")+")"},set:function(t,e){for(var i in e)t.style[i]=e[i]}};function c(t){t.parentNode.removeChild(t)}function u(t){return"function"==typeof t}var p=d.addPrefix("transform"),f=d.addPrefix("box-sizing"),v=d.addPrefix("transform",!0),m=d.addPrefix("transition",!0),x=d.addPrefix("transitionDuration",!0);function y(t){if(this.options=t||{},this.$wrapper="string"==typeof this.options.selector?document.querySelector(this.options.selector):this.options.selector,!this.$wrapper||1!==this.$wrapper.nodeType)throw new Error('通过"selector"获取不到相应元素');if(this.$list=this.options.listSelector?this.$wrapper.querySelector(this.options.listSelector):this.$wrapper.firstElementChild,!this.$list||1!==this.$list.nodeType)throw new Error("获取不到列表元素");this.$wrapper.addEventListener(s,this,l),this.$wrapper.addEventListener(o,this,l),this.$wrapper.addEventListener(n,this,l),e||(this.$wrapper.addEventListener("mouseover",this,!1),this.$wrapper.addEventListener("mouseout",this,!1)),this.options.prevSelector&&(this.$prevBtn="string"==typeof this.options.prevSelector?document.querySelector(this.options.prevSelector):this.options.prevSelector,this.$prevBtn.addEventListener("click",this,!1)),this.options.nextSelector&&(this.$nextBtn="string"==typeof this.options.nextSelector?document.querySelector(this.options.nextSelector):this.options.nextSelector,this.$nextBtn.addEventListener("click",this,!1)),window.addEventListener("resize",this,!1),this.$wrapper._Slide=this,this.updateOptions(this.options)}return y.prototype={autoPlay:!1,playing:!1,interval:4e3,duration:100,index:0,itemSize:0,slideType:"slide",loop:!1,direction:"y",getLastIndex:function(){return this.$items.length-1},getCircleIndex:function(t){var e=this.$items.length;return(this.index+e+t%e)%e},updateOptions:function(t){var e=this;if("object"!=typeof t&&(t={}),this.options=t,"y"===t.direction?(this.direction="y",this.directionGroup=["Y","X","Height","Width"]):(this.direction="x",this.directionGroup=["X","Y","Width","Height"]),"boolean"==typeof t.loop){if(this.loop&&"slide"===this.slideType){var i=[].slice.call(this.$list.children,0),s=i[this.index]._realIndex;i.forEach((function(t){t._isClone&&c(t)})),function(t){var e=t.children.length;for(let o=0;o<e;o++)for(let n=0;n<e-1-o;n++){var i=t.children[n],s=t.children[n+1];i._realIndex>s._realIndex&&t.insertBefore(s,i)}}(this.$list),this.index=s}this.loop=t.loop}var o=["linear","ease","ease-in","ease-out","ease-in-out"];this.easing=o[1],o.forEach((function(i){i===t.easing&&(e.easing=i)})),["onBeforeSlide","onSlide","onChange"].forEach((function(i){u(t[i])&&(e[i]=t[i])})),["autoPlay","interval","duration","slideType"].forEach((function(i){null!=t[i]&&(e[i]=t[i])})),this.follow=!1!==t.follow&&"fade"!==this.slideType,this.setItems(),this.to(u(t.index)&&t.index>=0?t.index:this.index),this.stop(),this.autoPlay&&this.start()},setItems:function(){this.$items=[].slice.call(this.$list.children,0),"fade"===this.slideType?this.setFadeStyle():this.setSlideStyle()},setFadeStyle:function(){var t=this,e=this.$list.offsetWidth,i=this.$list.offsetHeight;this.$list.style.width=e+"px",this.$list.style.height=i+"px",this.$items.forEach((function(s,o){var n={position:"absolute",left:0,top:0,width:e+"px",height:i+"px",opacity:0===o?1:0,float:"none"};n[v]=d.getTransVal(0,this.direction),n[m]="opacity 0ms "+t.easing,d.set(s,n),s._realIndex=o}))},setSlideStyle:function(){var t,e=this,i=this.directionGroup[2],s=this.$wrapper["offset"+i];this.itemSize=s,this.$wrapper.style["overflow"+this.directionGroup[0]]="hidden",t={webkitBackfaceVisibility:"hidden",backfaceVisibility:"hidden",webkitPerspective:"1000",perspective:"1000"};var o=this.loop?this.$items.length+1:this.$items.length;t[i.toLowerCase()]=s*o+"px",t[v]=d.getTransVal(-s*this.index,this.direction),t[m]=p+" 0ms "+this.easing,d.set(this.$list,t),this.$items.forEach((function(t,o){t.style[i.toLowerCase()]=s+"px",t._realIndex=o,"x"===e.direction?t.style.float="left":t.style.float="none",t.style[f]="border-box"}))},updateSlideLoop(){var t,e=this.$items[0],i=this.$items[this.$items.length-1],s=this.$list,o=e._isClone||i._isClone,n=this.index;if(o){var r=!1,h=this.$items.length;this.$items[n]._isClone?(n===h-1?(s.replaceChild(e,i),n--):s.replaceChild(i,e),r=!0):0===n?(c(i),r=!0):n===h-1&&(c(e),n--,r=!0),r&&(this.$items=[].slice.call(s.children,0),e=this.$items[0],i=this.$items[this.$items.length-1],o=!1)}o||(n===this.$items.length-1?((t=e.cloneNode(!0))._realIndex=e._realIndex,t._isClone=!0,s.appendChild(t)):((t=i.cloneNode(!0))._realIndex=i._realIndex,t._isClone=!0,s.insertBefore(t,e),n++),this.$items=[].slice.call(s.children,0)),n!==this.index&&(this.$list.style[x]="0ms",this.$list.style[v]=d.getTransVal(-this.itemSize*n,this.direction),this.index=n)},onMouseOver:function(){this.stop()},onMouseOut:function(t){this.autoPlay&&this.start(),this.onTouchEnd(t)},onResize:function(){var t=this;clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout((function(){t.refresh()}),100)},handleEvent:function(t){switch(t.type){case s:this.onTouchStart(t);break;case o:this.onTouchMove(t);break;case n:this.onTouchEnd(t);break;case"mouseover":this.onMouseOver(t);break;case"mouseout":this.onMouseOut(t);break;case"resize":this.onResize(t);break;case"click":t.target==this.$prevBtn?this.onPrevClick():t.target==this.$nextBtn&&this.onNextClick()}},onBeforeSlide:r,onSlide:r,onChange:r,onTouchStart:function(t){var s=this;if(t.preventDefault(),!this.playing){this.clear(),i&&(this.touchMoveTimeout=setTimeout((function(){s.resetStatus()}),3e3)),this.inMove=!0,delete this.horizontal;var o=e?t.touches[0]:t;this.touchCoords={},this.touchCoords.startX=o.pageX,this.touchCoords.startY=o.pageY,this.touchCoords.timeStamp=t.timeStamp}},onTouchMove:function(t){if(this.inMove&&this.touchCoords){var i=e?t.touches[0]:t;this.touchCoords.stopX=i.pageX,this.touchCoords.stopY=i.pageY;var s=this.touchCoords.startX-this.touchCoords.stopX,o=this.touchCoords.startY-this.touchCoords.stopY;"y"===this.direction&&(s=[o,o=s][0]);var n=Math.abs(s),r=Math.abs(o);if(void 0!==this.horizontal)0!==s&&t.preventDefault();else{if(!(n>r))return delete this.touchCoords,void(this.horizontal=!1);this.horizontal=!0,0!==s&&t.preventDefault(),clearTimeout(this.touchMoveTimeout)}if(this.follow){var h=this.itemSize,a=this.index,l=a*h,c=this.getLastIndex();l+=0===a&&s<0||a==c&&s>0?Math.ceil(s/Math.log(Math.abs(s))):s,n<h&&(this.$list.style[v]=d.getTransVal(-l,this.direction))}}},onTouchEnd:function(t){if(clearTimeout(this.touchMoveTimeout),this.inMove){if(this.inMove=!1,this.touchCoords){var e,i=this.itemSize,s="x"===this.direction?this.touchCoords.startX-this.touchCoords.stopX:this.touchCoords.startY-this.touchCoords.stopY,o=Math.abs(s),n=this.index;isNaN(o)||0===o||(o>i&&(o=i),e=o>=80||t.timeStamp-this.touchCoords.timeStamp<200?s>0?n+1:n-1:n,this.to(e),delete this.touchCoords)}this.resetStatus()}},onPrevClick:function(){this.clear(),this.prev(),this.autoPlay&&this.run()},onNextClick:function(){this.clear(),this.next(),this.autoPlay&&this.run()},prev:function(){this.to(this.index-1)},next:function(){this.to(this.index+1)},start:function(){this.running||(this.running=!0,this.clear(),this.run())},stop:function(){this.running=!1,this.clear()},clear:function(){clearTimeout(this.slideTimer),this.slideTimer=null},run:function(){var t=this;this.slideTimer||(this.slideTimer=setInterval((function(){t.to(t.getCircleIndex(1))}),this.interval))},resetStatus:function(){this.autoPlay&&this.run()},to:function(t){var e=this.index;t>=0&&t<=this.getLastIndex()&&t!=e?this.slide(t):this.slide(e)},slide:function(t){if(!this.playing){var e=this,i=this.index,s=this.$items[i]._realIndex,o=this.$items[t]._realIndex;if(this.playing=!0,this.index=t,this.onBeforeSlide(o,s),o!==s&&this.onChange(o,s),"fade"===this.slideType){var n=t>=i?t:i;this.$items[n].style[x]=this.duration+"ms",this.$items[n].style.opacity=t>=i?1:0}else this.$list.style[x]=this.duration+"ms",this.$list.style[v]=d.getTransVal(-this.itemSize*t,this.direction);setTimeout((function(){e.playing=!1,"fade"===e.slideType?e.$items[n].style[x]="0ms":e.$list.style[x]="0ms",e.onSlide(o,s),"slide"===e.slideType&&e.loop&&e.updateSlideLoop()}),this.duration)}},refresh:function(){this.setItems();var t=this.getLastIndex();this.index>t?this.to(t):this.loop&&this.updateSlideLoop()},destroy:function(){this.destroyed=!0,this.stop(),this.$wrapper.removeEventListener(s,this,l),this.$wrapper.removeEventListener(o,this,l),this.$wrapper.removeEventListener(n,this,l),e||(this.$wrapper.removeEventListener("mouseover",this,!1),this.$wrapper.removeEventListener("mouseout",this,!1)),this.$prevBtn&&this.$prevBtn.removeEventListener("click",this,!1),this.$nextBtn&&this.$nextBtn.removeEventListener("click",this,!1),this.$wrapper=this.$list=this.$items=this.$prevBtn=this.$nextBtn=null}},y})?s.apply(e,o):s)||(t.exports=n)}])}));