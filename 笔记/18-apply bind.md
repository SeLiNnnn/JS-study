# 一、关于this的补充

```javascript
fn();//函数自执行,this指向window
document.onclick = fn();//这样也是自执行,先读等号右边,
这样就相当于把返回值undefined给document的点击事件,导致点击的时候不会触发事件。

document.onclick = fn;//this指向document
function fn() {
    console.log(this);
    var a = 10;
    return function () {//这里的匿名函数才是事件函数,借此可以来做闭包
        console.log( ++a );//这是一种在事件函数里做计数的常见方法
    }
}
```

```javascript
document.onclick = (function () {
    var a = 10;
    return function () {
        console.log(++a);
    }
})();//闭包,计数器
```

```javascript
var json = {//json不是关键词
  goudan : 123
};
fn.call(json);//使用call,this指向从window变成了json(打印出obj)

function fn() {
    console.log(this);
}
```

```javascript
document.onclick = function () {
    fn.call(this);//这个this不是fn内部的this,这是实参,是外部准备给你的,不是自己的this
    //实参this是属于当前事件函数function的作用域,事件函数里的this指向事件触发的主体document
};

function fn() {
    console.log(this);
}
```

## Function `call()` `applay()` `bind()`方法

函数的`call()`,`apply()`,`bind()`方法都是用于`改变`函数内部`this指向`  用法`Function.call()`,`Function.apply()`,`Function.bind()`

# 二、apply的用法

apply和call的用法是类似的,也可以改变this指向，但实参的对应是不一样的！

apply只能对应两个实参,apply(this指向, []);

只能是this指向和数组,数组里的第一位对应第一个形参,依次类推。

```javascript
fn();//window

fn(1,2);//window,3

fn.call(document,1,2);//document,3
```

```javascript
//fn.apply(document);//document,NaN

fn.apply(document, [3,2]);//document,5

function fn( a, b ) {
    console.log(this);
    console.log(a+b);
}
```



# 三、bind

**bind完全不支持IE**
call和apply在函数自执行(马上就要执行)的时候改变this指向。
换一种说法,用了call和apply,函数就一定会立马执行。

```javascript
var json = {
    a : 10
};

document.onclick = fn.call(json);//不需要等到点击,立马就执行了

function fn() {
    console.log(this);
}
```

```javascript
var json = {
    a : 10
};

document.onclick = fn.bind(json);//不会立马执行,
// 点击才改变this的指向,当后面的代码或者事件触发该函数之后,改变函数内部的this

function fn() {
    console.log(this);
}

 fn.call();//call其实是一个函数,内部也有其他语句的执行来改变this指向
	fn.call = function () {
}
```

```javascript
fn(
    function () {
        console.log(this);
    }.bind(document)//不会让函数立马执行,thi                                                                                                                                     s指向document
);

function fn(a) {
    a();
}

document.onclick = function () {
    console.log(this);//document
}
```

```javascript
fn(
    function (i, j) {
        console.log(this);//document
        console.log(i+j);//3
    }.bind(document)//bind不影响传参
);

function fn(a) {
    a(1,2);
}
```