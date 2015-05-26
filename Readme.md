# MSlide.js

移动端滑动插件

可用于实现幻灯片
或者安卓常见的左右滑动窗口

效果详见 [Demo](http://travisup.com/demo/plugins/mslide/demo.html)

### Usage

##### new MSlide(options)

eg:
    
    var slide = new MSlide({selector: ".wrap"});

### Options

插件提供可配置的选项：
    
* `selector`: 模块选择器，可以是`#id/.class`或`element`
* `listSelector`: 列表选择器，参数同上，如果不传入则默认第二个子元素，一般第一个子元素为`tabs`
* `prevSelector`: 点击可跳转到上一项的元素，参数同上，一般配合幻灯片使用
* `nextSelector`: 点击可跳转到下一项的元素，参数同上，一般配合幻灯片使用
* `autoPlay`: 是否自动滑动，一般幻灯片使用，默认`false`
* `interval`: 两次滑动之间的间隔时间，默认`4000`秒
* `index`: 初始定位指定项，默认`0`
* `onSlide`: 滑动后回调函数，调用后传入索引作为第一个参数，`this`指向`slide`自身

### Method

##### .to(index)

滑动到指定项（已做边界处理），如滑动到第6项（0开始），eg:

	slide.to(5);

##### .prev()

滑动到上一项（不做循环）

##### .next()

滑动到上一项（不做循环）

##### .refresh()

刷新列表项，比如说增加了一项。
由于初始化时设置了dom的宽度，该项也会重置宽度，配合`onresize`适应变化的屏幕。

##### .destroy()

销毁绑定事件和自动滑动。

### Author

[Travis](http://travisup.com/)