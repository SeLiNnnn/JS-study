<<<<<<< HEAD
# 闭包和call

## 一、js垃圾回收机制

​	JS中的变函不再使用后，会自动被js垃圾回收机制回收。

1.全局变量是不会被回收的，除非关闭标签页。

2.局部变量在完成其功能后，就会被回收。

```javascript
function fn() {
    var a  = 5;
    alert(a);
}

fn();
//当前的函数执行完毕后，只要后面没有再使用a，a就被回收了。
//所以这也是在作用域那节课，我们所说的外部的语句无法访问内部变量的原因。
```

3.全局变量的堆内存释放

```javascript
var b = {
    a : 5,
    x : 10
};
alert(b.x);
//b是全局变量,b是个引用型数据
// 假设到此为止,b的使用已经全部完成
//就这样放着虽然没有问题,但不是最好的方式。
//因为b是个全局变量,只要b没有被销毁,b在堆里也就不会被销毁

b = null;//回收:虽然b还在,但释放了堆内存(释放了b的内容),让b不再和堆对应
```

# 二、闭包

​	闭包：可以访问 别的函数作用域 里面的变量 的函数。

### 外部拿到函数作用域里局部变量的方法：

```javascript
//1.return
function fn() {
    var a = 10;
    console.log(a);
    return a;
}

var b = fn();
alert(b);

//2.赋值给全局变量
var b;
function fn() {
    var a = 10;
    console.log(a);
    b=a;
}
fn();
alert(b);
//以上都不是闭包,只是转存了而已,局部变量a最终还是被销毁了
```

## 1.形成闭包的条件

> 条件一： `函数内部嵌套函数` 
> 条件二： 内部函数引用外部函数的变量/参数
> 使用 `return` 返回此内部函数,函数里面的 `变量` 和`参数` 虽然还是局部变量，但不会被回收

```javascript
var a = 20;

function fn() {
    var a = 10;
    return function () {
        a ++;
        alert(a);
    }
}

var b = fn();//b实际上指向的是return后的匿名函数,b()执行其实是匿名函数的执行
b();//弹出11
b();//弹出12
//发现a没有被销毁,此时的b就是闭包
//而且此时的b弹出的不是20,说明函数作用域是在定义的地方，而不是执行的地方。
```

## 2.函数作用域

​	函数作用域不是在哪儿调用才在哪儿，而是在哪儿定义就在哪儿。

## 3.闭包的应用

```javascript
<div id="wrap">
    <p>0</p>
    <p>11</p>
    <p>222</p>
    <p>3333</p>
</div>
...
var aP = document.getElementsByTagName("p"),
                length = aP.length;
//自定义属性方法
for (var i = 0; i < length; i++) {
    aP[i].index = i;
    aP[i].onclick = function () {
    	alert(this.index);
    }
}
//闭包的原理
for (var i = 0; i < length; i++) {
    x(i);//实参
    function x( goudan ) {
        aP[goudan].onclick = function () {
        alert(goudan);//这个匿名函数,使用了外部函数的参数,导致这个参数goudan不会被回收
        //分别弹出0123的序号
        //执行了4次所以产生了4个闭包
        }
    }
}

//更好的写法
for (var i = 0; i < length; i++) {
    (function ( goudan ) {
    aP[goudan].onclick = function () {
        alert(goudan);
        //闭包一般是结合函数自执行来使用
        };
	})(i);
}              
```

```javascript
//常规操作
for (var i = 0; i < length; i++) {
    (function ( i ) {//实际开发时,一般形参会取i,假装和外部的i是对应,更符合语义
        aP[i].onclick = function () {
            alert(i);
        };
    })(i);
}
```

```javascript
//注意区分
var x = 20;
a(x);//这个x不在函数作用域里,所以传的值是20

function a() {
    var x = 10;
}
```

```javascript
//疑问？
!function f() {
    for (var i = 0; i < length; i++) {//这里的i被销毁了,因为内部的函数没有使用外部函数的变量i
        !function (g) {
            aP[g].onclick = function () {
                alert(g);
            };
        }(i);
    }
}();
```

## 4.关于闭包的练习

```javascript
//重点理解
fn()();//先执行fn,再c()
//fn()()();这里已经不能再加括号了,因函数c返回值为undefined,un();就报错了
var a = 0;
function fn() {
    alert(a);//undefined
    var a = 3;
    function c() {
        alert(a);//3
    }//这里的函数c不是自执行
    return c;
}
```

```javascript
//练习2
var a = 5;
function fn() {
    var a = 10;
    alert(a);
    function b() {
        a ++;
        alert(a);
    }
    return b;
}
var c = fn();//10
c();//11
fn()();//10,11
c();//12

//思考步骤   
//1.定义
//var a,funcion fn,var c
//2.执行
//  1.var c = fn();
// 2.var 1 =10;alert(a)=10
//  3. return b,b给c,c和b的指针一样
// 4.c()执行相当于b执行,但b已经被销毁了
// 5.b执行,a=10,a++,alert(a)=11
// 6. fn()();执行fn,这里的fn和var c的fn,
// 即使是同一个函数但也是两个相同且独立的作用域,也就是不会存储上一次执行后的结果
// 7.fn()();的执行相当于再执行了一次var a=10,alert(a)=10,funtion b,a++,alert(a)=11
//8.c()再执行的时候,不需要开辟新的作用域,且var a=10灭有被销毁,所以会接着上一次的a=11进行a++,弹出12


//对第六点的说明
// function x() {
//     var a = 5;
//     a ++;
//     alert(a);
// }
// x();//6
// x();//6
```

## 5.call的使用

```javascript
var id = "window";//定义的全局变量,相当于window.id(window的属性)
document.id = "Document";

var oWrap = document.getElementById("wrap"),
	oBox = document.getElementById("box");
oWrap.onclick = function () {
	a.call(this,1);
};
oBox.onclick = function () {
	a.call(this,2);
};
function a(num) {
	console.dir(num + ":" + this.id);//1:wrap/2:box
}
//衍生出来的案例相见课堂操作
```
=======
# 闭包和call

## 一、js垃圾回收机制

​	JS中的变函不再使用后，会自动被js垃圾回收机制回收。

1.全局变量是不会被回收的，除非关闭标签页。

2.局部变量在完成其功能后，就会被回收。

```javascript
function fn() {
    var a  = 5;
    alert(a);
}

fn();
//当前的函数执行完毕后，只要后面没有再使用a，a就被回收了。
//所以这也是在作用域那节课，我们所说的外部的语句无法访问内部变量的原因。
```

3.全局变量的堆内存释放

```javascript
var b = {
    a : 5,
    x : 10
};
alert(b.x);
//b是全局变量,b是个引用型数据
// 假设到此为止,b的使用已经全部完成
//就这样放着虽然没有问题,但不是最好的方式。
//因为b是个全局变量,只要b没有被销毁,b在堆里也就不会被销毁

b = null;//回收:虽然b还在,但释放了堆内存(释放了b的内容),让b不再和堆对应
```

# 二、闭包

​	闭包：可以访问 别的函数作用域 里面的变量 的函数。

### 外部拿到函数作用域里局部变量的方法：

```javascript
//1.return
function fn() {
    var a = 10;
    console.log(a);
    return a;
}

var b = fn();
alert(b);

//2.赋值给全局变量
var b;
function fn() {
    var a = 10;
    console.log(a);
    b=a;
}
fn();
alert(b);
//以上都不是闭包,只是转存了而已,局部变量a最终还是被销毁了
```

## 1.形成闭包的条件

> 条件一： `函数内部嵌套函数` 
> 条件二： 内部函数引用外部函数的变量/参数
> 使用 `return` 返回此内部函数,函数里面的 `变量` 和`参数` 虽然还是局部变量，但不会被回收

```javascript
var a = 20;

function fn() {
    var a = 10;
    return function () {
        a ++;
        alert(a);
    }
}

var b = fn();//b实际上指向的是return后的匿名函数,b()执行其实是匿名函数的执行
b();//弹出11
b();//弹出12
//发现a没有被销毁,此时的b就是闭包
//而且此时的b弹出的不是20,说明函数作用域是在定义的地方，而不是执行的地方。
```

## 2.函数作用域

​	函数作用域不是在哪儿调用才在哪儿，而是在哪儿定义就在哪儿。

## 3.闭包的应用

```javascript
<div id="wrap">
    <p>0</p>
    <p>11</p>
    <p>222</p>
    <p>3333</p>
</div>
...
var aP = document.getElementsByTagName("p"),
                length = aP.length;
//自定义属性方法
for (var i = 0; i < length; i++) {
    aP[i].index = i;
    aP[i].onclick = function () {
    	alert(this.index);
    }
}
//闭包的原理
for (var i = 0; i < length; i++) {
    x(i);//实参
    function x( goudan ) {
        aP[goudan].onclick = function () {
        alert(goudan);//这个匿名函数,使用了外部函数的参数,导致这个参数goudan不会被回收
        //分别弹出0123的序号
        //执行了4次所以产生了4个闭包
        }
    }
}

//更好的写法
for (var i = 0; i < length; i++) {
    (function ( goudan ) {
    aP[goudan].onclick = function () {
        alert(goudan);
        //闭包一般是结合函数自执行来使用
        };
	})(i);
}              
```

```javascript
//常规操作
for (var i = 0; i < length; i++) {
    (function ( i ) {//实际开发时,一般形参会取i,假装和外部的i是对应,更符合语义
        aP[i].onclick = function () {
            alert(i);
        };
    })(i);
}
```

```javascript
//注意区分
var x = 20;
a(x);//这个x不在函数作用域里,所以传的值是20

function a() {
    var x = 10;
}
```

```javascript
//疑问？
!function f() {
    for (var i = 0; i < length; i++) {//这里的i被销毁了,因为内部的函数没有使用外部函数的变量i
        !function (g) {
            aP[g].onclick = function () {
                alert(g);
            };
        }(i);
    }
}();
```

## 4.关于闭包的练习

```javascript
//重点理解
fn()();//先执行fn,再c()
//fn()()();这里已经不能再加括号了,因函数c返回值为undefined,un();就报错了
var a = 0;
function fn() {
    alert(a);//undefined
    var a = 3;
    function c() {
        alert(a);//3
    }//这里的函数c不是自执行
    return c;
}
```

```javascript
//练习2
var a = 5;
function fn() {
    var a = 10;
    alert(a);
    function b() {
        a ++;
        alert(a);
    }
    return b;
}
var c = fn();//10
c();//11
fn()();//10,11
c();//12

//思考步骤   
//1.定义
//var a,funcion fn,var c
//2.执行
//  1.var c = fn();
// 2.var 1 =10;alert(a)=10
//  3. return b,b给c,c和b的指针一样
// 4.c()执行相当于b执行,但b已经被销毁了
// 5.b执行,a=10,a++,alert(a)=11
// 6. fn()();执行fn,这里的fn和var c的fn,
// 即使是同一个函数但也是两个相同且独立的作用域,也就是不会存储上一次执行后的结果
// 7.fn()();的执行相当于再执行了一次var a=10,alert(a)=10,funtion b,a++,alert(a)=11
//8.c()再执行的时候,不需要开辟新的作用域,且var a=10灭有被销毁,所以会接着上一次的a=11进行a++,弹出12


//对第六点的说明
// function x() {
//     var a = 5;
//     a ++;
//     alert(a);
// }
// x();//6
// x();//6
```

## 5.call的使用

```javascript
var id = "window";//定义的全局变量,相当于window.id(window的属性)
document.id = "Document";

var oWrap = document.getElementById("wrap"),
	oBox = document.getElementById("box");
oWrap.onclick = function () {
	a.call(this,1);
};
oBox.onclick = function () {
	a.call(this,2);
};
function a(num) {
	console.dir(num + ":" + this.id);//1:wrap/2:box
}
//衍生出来的案例相见课堂操作
```

>>>>>>> 20课更新完毕
