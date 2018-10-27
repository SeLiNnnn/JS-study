# CSSOM视图模式(CSS Object Model View)

文档及其内容的视觉属性，包括`布局框定位`、`视区宽度`和`元素滚动`

## 一、元素视图属性

## 一、Window视图属性

------

#### 1、`innerWidth`/`innerHeight`

> `window.innerWidth` window窗口的内部宽度， 
> 不包括用户界面元素，比如窗框 
> `window.innerHeight`内部高度

## 二 、Document文档视图

------

#### 1、document.`documentElement.clientWidth`

> document.documentElement.clientWidth==>浏览器窗口可视宽度 
> document.documentElement.clientHeight==>浏览器窗口可视高度 
> ====》 可获取文档没有内容时候高度 
> 没有定义W3C的标准，则 IE为： 
> document.documentElement.clientWidth ==> 0 
> document.documentElement.clientHeight ==> 0

------

------

------

## 二、元素视图属性

#### 1、`clientWidth`/ `clientHeight` 可视宽高

> clientWidth对象的——————–`width + padding` 
> clientHeight 对象的——————height + padding 
> ==> 不包含子元素（一致）
>
> ```javascript
> document.documentElement.clientWidth//获取文档的可视化区域的宽度，不包括滚动条
> ```

------

#### 2、`offsetWidth`/ `offsetHeight` 可视宽高

> offsetHeight:对象`height + padding + border`
>
> offsetWidth: 对象width + padding + border 
> ==> 不包含子元素（一致）

------

#### 3、`scrollWidth`/ `scrollHeight` 可视宽高

> scrollWidth对象的`width + padding` 
> `scrollHeight`应该等用于`scrollTop + clientHeight` 
> 如果元素没有隐藏的部分，则相关的值应该等用于clientWidth和clientHeight 
> scrollHeight对象的height + padding 
> ==> 包含`子元素内容`,`子元素定位,`overflow:hidden`（一致）
>
> 从哪边超出就不算哪边的内边距，如果不超出，值和clientWidth是一样的

------

#### 4、`offsetParent` 定位父级

> 获取元素`最近的定位父级` 如果没有定位父级 则参考`body`（ 元素必须是定位元素）

------

#### 5、 `offsetTop`/`offsetLeft`

> `offsetLeft`:获取对象相对于`offsetParent`(left)位置
>
> `offsetTop`:获取对象相对于offsetParent(top)位置

获取元素的距离文档顶部的距离

```javascript
var iTop = 0;
var obj = oDiv3;
while (obj) {
	iTop += obj.offsetTop;
	obj = obj.offsetParent;
}
```

------

#### 6、`scrollTop`/`scrollLeft` 滚动宽,滚动高

> `可读可写`，有内容溢出元素才有效果 
> ele.`scrollTop` 元素Y轴滚动的距离 
> ele.`scrollLeft` 元素X轴滚动的距离
>
> #### 设置时`不能给px` 单位，否则会出错！！！！！！！！！！！！！！！！！！！！！！！！！！！！！

```
document.getElementsByTagName("body")[0].scrollTop = 100;
```

------

document.`body.scrollTop`/ `scrollLeft`

> 网页被卷去的高： document.body.scrollTop
>
> 网页被卷去的左： document.body.scrollLeft 
> `！！！`不兼容IE8及以下

```javascript
var box = document.getElementById('box');

var num = 0;

function fn(){
//num++;
box.scrollTop = ++num; 
document.title = box.scrollTop;
requestAnimationFrame(fn);
}
fn();
```



## 四、元素方法

------

#### 1、`getBoundingClientRect():`

> getBoundingClientRect():得到矩形元素的界线，返回的是一个对象，包含 `top, left, right, bottom`四个属性值，大小都是相对于浏览器窗口top,left 的距离。 
> 返回内容类似于：

```javascript
{ top: 143, right: 1196, bottom: 164, left: 889}
```

------

#### 2、`scrollIntoView():`

> ele.`scrollIntoView()` 让元素滚动到可视区域（HTML5标准),参数 `true` 与浏览器对齐，`false`元素在窗口居中显示

------

#### 3、`event.clientX`/`event.clientY`

> 相对于window，为鼠标相对于`浏览器窗口`的偏移 
> `event.clientX`鼠标在文档的水平座标

## `event.clientY` 鼠标在文档的垂直座标