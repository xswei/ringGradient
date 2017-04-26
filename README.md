# ringGradient
SVG环形渐变



效果图如下

![image](https://github.com/xswei/ringGradient/blob/master/1.gif)



[在线演示](https://bl.ocks.org/xswei/e1933d50b10e808fbb7b7b32c84adcd9)

### 使用方法

#### 引入脚本

```js

<script src="./src/d3.v4.js"></script>
<script src="./src/ringGradient.js"></script>

```

这个脚本依赖d3v4，因此在引入之前首先要引入`d3`库，准确来说本插件依赖`d3-selection`、`d3-scale`和`d3-format`.因此如果不想引入整个`d3`的话，可以单独引入这几个模块也可以。但是要在本插件之前。

#### 初始化

本插件会在`d3`全局变量下创建一个`RingGradient`的属性，这个属性是一个构造函数，可以`new`一个环形渐变对象:

```js

var ring = new d3.RingGradient(options)

```

options为选项：

```js
var options = {
	svg:"#svg",
	cx:300,
	cy:300,
	dotStrokeWidth:5
}

```

options完整属性以及说明如下:


 | 参数 | 描述 | 类型 | 必须 | 默认值
--- | --- | --- | --- | ---
svg | SVG容器描述 | 合法的CSS选择器字符串或者d3-selection实例 | 是 | -
cx | 圆环中心x坐标 | 数值 | 否 | 0
cy | 圆环中心y坐标 | 数值 | 否 | 0
r | 圆环半径 | 数值 | 否 | 100
color | 颜色插值器 | 插值器,输入范围[0,1] | 否 | 默认"blue"->"red"
ringWidth | 圆环宽度 | 数值 | 否 | 5
dotRadius | 圆环末端圆半径 | 数值 | 否 | 10
dotStrokeWidth | 圆环末端圆边宽度 | 数值 | 否 | 3
dotFill | 圆环末端圆填充色 | CSS颜色字符串 | 否 | "#fff"
textFormat | 圆环中字体格式 | d3-fotmat | 否 | 12.3%

#### 更新

返回的对象包含一个`update`方法用来更新圆环:

```js

ring.update(t)

```

其中参数`t`必须，且范围为[0,1]

#### 移除

```js

ring.delete()

```