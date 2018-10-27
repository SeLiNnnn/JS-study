# 一、cssStyle 操作

- 无法操作外部css
- 内部样式要考虑优先级
- 一般操作行内样式

## 1、css样式赋值

- style 是对象，不要直接点操作style


- 复合样式改写 `background-color ------> backgroundColor`

```javascript
var oW = document.getElementById("wrap");
console.log(oW.style);//节点对象 .style，操作的只是行内样式
// oW.style = "width:200px;";//不推荐,style是一个对象，这样会把它变成一个字符串
oW.style.width = "200px";//推荐这样使用
oW.style.backgroundColor = "green";//驼峰命名，-会被认为是减号
```

- `cssText`

```javascript
oW.style.cssText += "width:50px;height:100px;background-color:red;";//不需要使用驼峰写法
```

- 获取css样式

```javascript
alert ( oW.style.width );//只能获取行内样式的值，而不是获取标签最终的样式显示状态
```


- style.float的兼容 `cssFloat /styleFloat`
- 似乎根本无法使用了

float不能直接点操作，cssFloat兼容其他浏览器，styleFloat兼容IE。

- 结合className

```
.fl{
    float: left;
}
.fr{
    float: right;
}
...
<div id="wrap"></div>
...
 var oW = document.getElementById("wrap");
 oW.className = "fl";
//如果本身就有类名
oW.className += " fl";//+= 空格
```

