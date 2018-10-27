# 一、数字相关API

## 1.number类型

	NaN
	isNaN()  当参数是NaN的是，返回true。当参数能被Number()转化为数字的话，返回false
	NaN和它自己都不等

```javascript
var a = undefined + 1;
console.log(a);//NaN

alert(isNaN("456"));//false
alert(isNaN("h456"));//NaN
alert(isNaN("0"));//false

alert(NaN===NaN);//false

var a = NaN;
alert(a===a);//false

alert( {} === {} );//false
引用型，比较的是指针地址，这是2个不同的json。

var a = {};
alert( a === a );//true,自己是等于自己的
```

## 2.parseInt() 强制取整

	parseFloat() 强制取数(可以取到小数)
	从第一位非空格的字符开始识别，能取到满足规则的数字则返回数字，否则NaN

```javascript
var b =Number("10.2");//10.2

var b = Number("10.2h");//NaN
var b = Number("10px");//NaN

var b = parseInt("10px");//10
var b = parseInt("10px20");//10
var b = parseInt("10.2px20");//10

var b = parseInt("abc20");//找到a,无法转化，NaN
var b = parseInt("    -10abc20");//-10
var b = parseInt("     +10px20");//10
var b = parseInt("   - 10abc20");//NaN,符号数字不能分开
var b = parseInt(".1");//NaN

var b = parseFloat(" 10.2px20");//10.2
var b = parseFloat("10px20");//10,不会强制加小数
var b = parseFloat(" .1");//0.1

console.log(b);
```



## 3.Math 数字函数

#### 1、`Math.random()` 求随机值,不需要传参

> `Math.random()`随机 `0至 小于1 的数` 取不到1

```javascript
//生成[0，10)的随机数
var a = Math.random();
var a = Math.random() * 10;

//生成[10，15)的随机数
var a = Math.random()*5 + 10;//[0,1)*5 --> [0,5)+10 --> [10,15)

//生成[10,15)的整数
var  a = Math.floor(Math.random()*6+10);//10 11 12 13 14 15
alert(a);
```

#### 2、封装 随机 X至Y之间的数

```javascript
function random(x,y){
	var rand = x+ Math.random()*( y - x );
}
```

## 2.求最值

```javascript
var arr = [5,7,8,9];
var max = Math.max.apply(Math,arr);//取到数组中的最大值
console.log(max);//9

console.log(Math.max(5,9,"80",99));//99能比较，但不推荐这样用
```

## 3.其他API

```javascript
Math.PI
Math.abs();绝对值
Math.max();
Math.min();

Math.floor();向下取整,舍弃小数部分
Math.ceil();向上取整,不管小数有多小，全部加1
Math.round();四舍五入
            
学有余力还可了解一下三角函数相关的API
Math.sin()  Math.asin()
Math.cos()  Math.acos()

```

