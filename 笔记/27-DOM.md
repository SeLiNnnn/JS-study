# DOM文档对象模型

DOM(Document Object Model) 文档树对象模型，document是整个文档对象

```
js的三大组成：
*   DOM 文档的对象模型
*   BOM
*   ECMAScript es,js的语法规范
```

## 一、节点属性

```
节点:
*   document 文档节点
*   html元素 元素节点
*   文字/空格/换行 文本节点
*   html标签属性 属性节点
*   注释节点
```

#### childNodes \ `children`

> Ele.childNodes ————————–子节点集合 
> 元素.childNodes : 只读 属性 子节点列表集合 
> 标准下： 包含了文本和元素类型的节点，也会包含非法嵌套的子节点 
> 非标准下：只包含元素类型的节点，ie7以下不会包含非法嵌套子节点 
> childNodes 只包含一级子节点，不包含后辈孙级

```javascript
* childNodes 返回子节点，包括文本节点。但IE8及以下，不会返回空格的文本节点，除非是文字。
* children 获取子元素节点，没有兼容性问题，经常用到，是动态获取
* nodeType 获取节点类型，返回的是编号
* nodeName 获取解节点名称
* tagName 获取标签名称
```

`ele.children`————————– 获取第一级子元素 
`nodeType` : 只读 属性 获取当前元素的节点类型，返回的是编号， 共12种

- 元素节点: 1
- 属性节点: 2 wrap.attributes[0].nodeType
- 文本节点: 3

`nodeName` 节点名称

元素节点属性

- ele.`tagName` 元素标签名称



有关属性节点操作（几乎用不到，了解即可）

- 获取 ： obj.getAttributeNode() 方法获取指定的属性节点。
- 创建 ： document.`createAttribute(name)` 创建拥有指定名称的属性节点，并返回新的 Attr 对象。
- 添加 ： obj.setAttributeNode() 方法向元素中添加指定的属性节点。

#### 1、firstChild \ `firstElementChild` 第一个子节点

> ele.firstChild : 只读 属性 
> 标准下：firstChild会包含文本类型的节点 
> 非标准下：只包含元素节点
>
> ele.`firstElementChild` : 只读 属性 标准下获取第一个元素类型的子节点 
> 非标准下：无
>
> 获取第一个子节点，兼容良好。主流浏览器可能返回文本节点，但在IE8及以下不会返回空格换行的文本节点

------

#### 2、lastChild \ `lastElementChild` —————————————————最后一个子节点

> 兼容性同上

------

#### 3、nextSibling \ `nextElementSibling` ——————————————`下一个兄弟`节点

> 兼容性同上

------

#### 4、previousSibling \ `previousElementSibling` ——————————-`上一个兄弟`节点

> 兼容性同上

------

#### 5、`parentNode`———————————————————————获取父节点

------

```javascript
//获取父级节点,兼容IE8
console.log(oBox.parentNode);//<body>..</body>
console.log(oBox.parentNode.nodeName);//BODY
```



#### 6、`offsetParent` ——————————————————————最近定位父级

------

```javascript
console.log(oBox.children[0].offsetParent);//<div id="wrap">...</div>
//如果没有参考父级，会返回body
```

#### 7、`childElementCount` 子元素节点个数

> 元素类型子节点数量，等同于 `children.length`，不兼容IE8

#### 案例

```css
#wrap {
    position: relative;
    width: 200px;
    height: 200px;
    background-color: #f66;
    font-size: 30px;
    color: #fff;
}
p {
    position: absolute;
}
```

```html
<div id="wrap">123
    <p>哈哈</p>
    <ul>
        <li>牧渔</li>
        <li>冀秋</li>
        <li>留到</li>
    </ul>
</div>
```

```javascript
var oBox = document.getElementById("wrap");

//console.log(oBox.childNodes);//只返回子节点
// console.log(oBox.children);//只返回子元素节点
// console.log(oBox.nodeType);//返回1
// console.log(oBox.childNodes[0].nodeType);//返回3,代表文本节点
// console.log(oBox.childNodes[1].nodeName);//ul 节点名称
// console.log(oBox.nodeName);//DIV
//console.log(oBox.tagName);//DIV
// console.log(oBox.getAttributeNode("id").nodeName);//返回id，属性节点名称就是属性名
//
// var attr = document.createAttribute("title");
// oBox.setAttributeNode(attr);
// console.log(attr);//空的title

// console.log(oBox.firstElementChild);//<p>哈哈</p>获取第一个子元素节点
// console.log(oBox.firstChild);//返回123
// console.log(oBox.lastChild);//返回#text
// console.log(oBox.lastElementChild.nodeName);//返回ul

// console.log(oBox.children[0]);//<p>哈哈</p>
// console.log(oBox.children[0].nextSibling + "节点");//[object Text]节点
// console.log(oBox.children[0].nextElementSibling);//ul
//console.log(oBox.children[1]);//ul
//console.log(oBox.children[1].previousSibling);//#text
//console.log(oBox.children[1].previousElementSibling);//<p>哈哈</p>

//获取父级节点,兼容IE8
//console.log(oBox.parentNode);//<body>..</body>
//console.log(oBox.parentNode.nodeName);//BODY

//获取定位参考父级
//console.log(oBox.children[0].offsetParent);//<div id="wrap">...</div>
//如果没有参考父级，会返回body

//获取自元素节点个数，不兼容IE8
console.log(oBox.childElementCount);//2
```

## 二、创建节点

------

1、`document.createElement('')` 创建元素节点

> innerHTML += 添加元素的问题，`原本子元素没有了`，不是原本的元素了
>
> `document.appendChild('')添加子节点`在内容最后添加一个节点

```javascript
var oBox = document.getElementById("box");

oBox.innerHTML = "<p>123</p>";//实际是一个字符串

var oP = document.createElement("p");//创建节点
oP.innerHTML = "我是被文档创建的节点";
oP.onclick = function() {
    alert(1);
};
oBox.appendChild(oP);//添加子节点
//使用createElement创建就只能使用appendChild添加
```

2、`document.createTextNode(str)` 创建文本节点

3、 element`.cloneNode()` 参数`true克隆元素及后代`不会克隆属性及事件，false克隆本元素

## 三、元素节点操作

##### 1、parent.`insertBefore(`new, node`)` 在已有元素`前插入`

> 插入子元素 ,在指定的子元素前面插入

##### 2、parent.`appendChild(`new`)` 在已有元素`后插入`

> 插入插入子元素，在指定的子元素前面插入 
> 例子：留言板插入内容

##### 3、parent.`removeChild(`节点`)`删除一个节点

> 删除DOM元素

##### 4、parent.`replaceChild(`new, old`)`替换节点

> 换元素

##### 5、cloneNode 克隆节点

```javascript
clneNode() 克隆节点，有参数
*   false 默认值，浅克隆，仅仅复制元素节点本身，不复制内容
*   true 深度克隆，全部复制
```

##### 案例

```html
<div id="box">
    <span>1111</span>
    <!--<span>2222</span>-->
    <!--<span>3333</span>-->
    <!--<span>4444</span>-->
</div>
```

```javascript
var oBox = document.getElementById("box");

// oBox.innerHTML += "<p>我是innerHTML添加的p标签</p>";//实际是一个字符串
//
// var oP = document.createElement("p");//创建节点
// oP.innerHTML = "我是被文档创建的p节点";
// oP.onclick = function() {
//     alert(1);
// };
//oBox.appendChild(oP);//添加子节点

//oBox.insertBefore(oP,oBox.children[1]);//获取第二个span,想把oP放到span前面
//oBox.removeChild(oBox.children[0]);//删掉了第一个span

//oBox.replaceChild(oP,oBox.children[2]);//用oP替换第三个span

oBox.appendChild(oBox.children[0].cloneNode());//克隆并添加了一个span标签，仅仅只有标签
oBox.appendChild(oBox.children[0].cloneNode(true));//全部复制，包括内容
```