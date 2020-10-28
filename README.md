# MSlide.js

内容滑动插件

可用于实现幻灯片
或者安卓常见的左右滑动窗口

## Usage

eg:

```
<script type="text/javascript" src="path/to/dist/mslide.js"></script>
<script>
  var slide = new MSlide({selector: ".wrap"});
</script>
```

## Options

插件提供可配置的选项：

- `selector`: 模块选择器，可以是`#id/.class`或`Element`
- `listSelector`: 列表选择器，参数同上，如果不传入则为第一个子元素
- `prevSelector`: 点击可跳转到上一项的元素，参数同上，一般配合幻灯片使用
- `nextSelector`: 点击可跳转到下一项的元素，参数同上，一般配合幻灯片使用
- `autoPlay`: 是否自动滑动，一般幻灯片使用，默认`false`
- `interval`: 两次滑动之间的间隔时间，默认`4000`秒
- `loop`: 是否循环切换，默认`false`
- `easing`: 动画曲线，有`linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out`可选，默认`ease`
- `duration`: 动画时间，默认`100`ms
- `slideType`: 动画效果，目前有`fade`渐变，和`slide`滑动，默认`slide`
- `direction`: 切换方向，目前有`y`竖向切换，和`x`横向切换，默认`x`，`slide`模式下有效
- `index`: 初始定位指定项，默认`0`
- `onBeforeSlide`: 滑动前回调函数，调用后传入索引作为第一个参数，`this`指向`slide`自身
- `onSlide`: 滑动后回调函数，调用后传入索引作为第一个参数，`this`指向`slide`自身
- `onClick`: 点击后回调函数（滑动时不触发），调用后传入点击事件作为第一个参数，`this`指向`slide`自身

## Method

### MSlide.prototype.to(index)

滑动到指定项（已做边界处理），如滑动到第 6 项（0 开始），eg:

```
slide.to(5);
```

### MSlide.prototype.prev()

滑动到上一项（不做循环）

### MSlide.prototype.next()

滑动到上一项（不做循环）

### MSlide.prototype.refresh()

刷新列表项，比如说增加了一项。

### MSlide.prototype.destroy()

销毁绑定事件和自动滑动。

## Author

[Travis](https://github.com/godxiaoji)
