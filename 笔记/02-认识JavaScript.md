# 一、认识JavaScript

## 5.JS里的系统弹窗代码

- `alert('内容')`;
- .`confirm('确定？')`;
- .`prompt('请输入您的姓名：')`; 
- console.log( )//调试完后一定要注释掉console.log，因为有的浏览器不支持console.log，一旦报错后续代码就无法执行。

## 6.变量

> 很多时候，当我们重复使用某个元素或者某个数据时，内容可能太长或者数据要进行改变，这时就需要定义变量来代替他们。

语法：`var` + `变量名`

- var `声明`
- 变量命名规则：

可以使用`$` , `_` ,`字母`， `数字`，[ [不能以数字开头][1] ] ,[[字母严格区分大小写][1]]], [ [见名知意][1] ]，不能使用已有的关键字/保留字/API。

```javascript
var abc; //申明不赋值

var obj = 123;//申明立即赋值
```

一个var可以声明多个变量，变量不一定要马上赋值

```javascript
var a,b,c,d;//一次声明多个变量

var a = 1,b = 2, c = 3,d = 4;//一次声明多个申明即赋值的变量
```

```javascript
var a = 50;

alert(a);//报错，此时会认为a是一个变量，由于未定义，所以报错，如果有定义，则弹出变量的值
alert("a");//这是弹出a字符，引号是字符串的标识，是不会被弹出的
alert(50);//弹出50
```

## 7.JS中的注释

- 单行 `//`
- 多行 `/* */`

## 8.获取元素

获取元素 

- 特殊的标签

  - `document.body`
  - `document.head`
  - `document.title`

- 一般标签

  - `document.getElementById()` 匹配**ID**名称…
  - ele.`getElementsByTagName()` 匹配**标签名**是…的集合[动态方法](http://maxiang.info/client_zh;)
  - `document.getElementsByName()` 匹配**name**是…的集合 [动态方法](http://maxiang.info/client_zh;)
  - ele`.getElementsByClassName()` 匹配**class**名称…的节点集合/伪数组 [动态方法](http://maxiang.info/client_zh;)
  - ele.`querySelector()`; 匹配**css选择器**的第一个
  - ele.`querySelectorAll()`; 匹配**css选择器**匹配的所有集合 
    `.` 及`[]`的运用

  ```javascript
  <p class="gg"></p>
  <p class="gg"></p>
  var aGG = document.getElementsByClassName("gg");
  aGG.innerHTML = "我们是p标签";//不能直接改变，因为aGG是节点的集合，必须把节点单独拿出来
  aGG[0].innerHTML = "第一个p标签";//使用[]拿出集合中的某一个来操作，从0开始计数

  <div class="goudan"></div>
   var aGou = document.getElementsByClassName("goudan");
   aGou[0].innerHTML = "我是狗蛋";//即使只有一个元素类名是goudan，获取的依然是一个集合
  ```

```javascript
/* case 1 获取 */
<div id="wrap">
    <p></p>
    <p></p>
</div>
<p></p>

var p = document.getElementsByTagName("p");
//p[0].innerHTML = 1;
//p[1].innerHTML = 2;
//p[2].innerHTML = 3;
// p[3].innerHTML = 4;//只有3个，多获取会报错

 var oWrap = document.getElementById("wrap");
var aP = oWrap.getElementsByTagName("p");//id获取必须的document，其他元素可以用单个元素来操作，注意不是集合。
aP[0].innerHTML = 1;
aP[1].innerHTML = 2;
aP[2].innerHTML = 3;//报错，因为此时获取的是wrap里的p标签，只有2个
```

```javascript
/* case 2  queryselectorAll*/
<div id="wrap">
    <p>
        <i></i>
		<i></i>
    </p>
</div>

var x = document.getElementById("wrap").getElementsByTagName("p")[0].getElementsByTagName("i");
等价于--
var x = document.querySelectorAll("#wrap p i");//选择器写法，但性能没有前一种好 

/* case 3 queryselector*/
var x = document.querySelectorAll("#wrap p i");//querySelector后不要再用querySelector来选择，会有错误。
x[1].innerHTML = "我是x操作的";

var y = document.querySelector("#wrap p i");
y.innerHTML = "我是y操作的";//如果有多个i，则选择第一个
```



![](G:\WEB前端系统班\JS精英实验班课堂操作&作业\笔记\pic\1.png)

## 9.获取和修改元素HTML

- 元素HTML内容 
  `ele.innerHTML` 获取元素HTML 
  ele.innerHTML = ‘字符串’; 修改元素HTML
- 元素文本内容 
  标准 
  `ele.textContent` 获取元素文本 
  ele.textContent = ‘字符串’; 修改元素文本 
  非标准(ie低版本) 
  `ele.innerText` 获取元素文本 
  ele.innerText = ‘字符串’; 修改元素文本
  1. document.write() ————————-能解析HTML
     - 往body后追加东西，需要注意的是当文档流关闭后，会直接覆盖整个文档 
       关于文档流关闭，和`window.onload`的讲解

```javascript
/* case 3 */
//定义变量
var oWrap = document.getElementById("wrap");

//页面一打开，就立马给wrap添加了文字
oWrap.innerHTML = "哈哈";                            
//还给wrap添加了一个点击事件
oWrap.onclick = function () {
    alert(1);
}
```

