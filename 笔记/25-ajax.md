## 一、 Ajax概述

> AJAX = `Asynchronous JavaScript and XML`（异步的 `JavaScript` 和 `XML`）。功能：在不刷新页面的情况下，实现与后台的数据交互

AJAX 不是新的编程语言，而是一种使用现有标准的新方法。 
Ajax技术核心是`XMLHttpRequest`对象(简称XHR)

- 1 运行在服务器
- 2 不能跨域

```
同源策略 主域名 www.baidu.com
*   只能跟同源的后台进行数据交互
*   要跨域只能通过后台相应的设置，或者接口(一个地址)
*   jsonp
```

## 二、XMLHttpRequest 对象方法

#### 一 、创建XMLHttpRequest 对象

> 创建 `new XMLHttpRequest()`
>
> ie 6以下版本`new ActiveXObject('Msxml2.XMLHttp.3.0')` 或 `new ActiveXObject('Msxml2.XMLHTTP.6.0')`

```javascript
new XMLHttpRequest() || new ActiveXObject('Msxml2.XMLHTTP.3.0')||new ActiveXObject('Msxml2.XMLHTTP.6.0'); 
```

#### 二 、`Open(``method`,`url`,`asynch`,[username],[password]`)`

> 指定和服务器端交互的HTTP方法，URL地址，即其他请求信息； 
> **Method**: http请求方法，一般使用”`GET`“,”`POST`“. 
> **url**： 请求的`服务器的地址`； 
> **asynch**： 是否采用异步方法，`true为异步`，`false为同步`； 
> 后边两个可以不指定，**username**和**password**分别表示`用户名`和`密码`，提供http认证机制需要的用户名和密码。

------

- `GET` 
  GET请求是最常见的请求类型，最常用于向服务器查询某些信息。必要时，可以将查询字符串参数追加到URL的末尾，以便提交给服务器。

```
xhr.open('get', 'demo.php?rand=' + Math.random() + '&name=Koo', true);
```

注意: 特殊字符(eg:`&`等)，传参产生的问题可以使用`encodeURIComponent()`进行编码处理，中文字符的返回及传参，可以将页面保存和设置为`utf-8`格式即可。或者使用提交url通用方法。

- `POST` 
  POST请求可以包含非常多的数据，我们在使用表单提交的时候，很多就是使用的POST传输方式。 
  xhr.open(‘post’, ‘demo.php’, true); 
  而发送POST请求的数据，不会跟在URL的尾巴上，而是通过`send()方法向服务器提交数据`。 
  xhr.send(‘name=Lee&age=100’); 
  一般来说，向服务器发送POST请求由于解析机制的原因，需要进行特别的处理。因为POST请求和Web表单提交是不同的，需要使用XHR来模仿表单提交。

```
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
```

------

#### 三 、`SetRequestHeader(`String header,String Value`)`如果是POST方式，需要设置`请求头`

> 设置HTTP请求中的指定头部header的值为value. 
> 此方法需在open方法以后调用，一般在post方式中使用。

```
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
```

#### 四、 `send(`data`)`

> 向服务器发出请求，如果采用异步方式，该方法会立即返回。 
> content可以指定为`null表示不发送数据`，其内容可以是DOM对象，输入流或字符串。

#### 五、 `Abort()`

> 停止当前http请求。对应的XMLHttpRequest对象会复位到未初始化的状态。

## 三、XMLHttpRequest对象属性

#### 一、 `onreadystatechange`

> 请求状态改变的事件触发器（readyState变化时会调用这个属性上注册的javascript函数）。

#### 二、 `readyState`

> 表示XMLHttpRequest对象的状态： 
> 0：未初始化。对象已创建，`未调用open`； 
> 1：`open方法成功调用`，但Send方法未调用； 
> 2：send方法已经调用，尚未开始接受数据； 
> 3：`正在接受数据`。Http响应头信息已经接受，但尚未接收完成； 
> **4**：`完成`，即响应数据接受完成。

#### 三、 `responseText` | `responseXML`

> responseText 服务器响应的`文本内容` 
> responseXML 服务器响应的`XML内容`对应的DOM对象

#### 四、 `Status`

> 服务器返回的`http状态码`。 
> **200**表示“`成功`”， 
> **404**表示“未找到”， 
> **500**表示“服务器内部错误”等。

a.通过xhr.`getResponseHeader(“Content-Type”)`;可以获取单个响应头信息 
b.`getAllResponseHeaders()`;获取整个响应头信息

```javascript
alert(xhr.getAllResponseHeaders());
```

![](/Users/selinnn/FrontEnd/JS精英实验班课堂操作&作业/笔记/pic/12.png)

#### 完整案例

```javascript
var ajax = new XMLHttpRequest();//ajax第一步，创建ajax对象---构造函数，必须使用new

    ajax.open('post',"www.baidu.com",true);//第二步，打开接口

    ajax.send();//发送数据

    //中止请求：可能由于网络原因，导致请求时间过长，可以设定一个时限，时间到如果还没有拿到数据就关闭这次请求
    //ajax.abort();//关闭请求的方法
    setTimeout(function () {
        ajax.abort();
    } ,5000);//时间到，就停止

    ajax.onreadystatechange = function () {//绑定监听事件,只要有所改变，就会触发
        if (ajax.readyState === 4) {
            //如果readystate===4,通常情况就是拿到数据，但也会有后台服务器故障的情况
            if (ajax.status >= 200 && ajax.status < 300 ||
                ajax.status === 304){
                //这个判断是为了确定服务器是否可用，可用才能拿到数据
                //当进入这个判断，就能拿到数据了

                console.log(ajax.responseText);//显示数据
            }
        }


    }
```



## 四、get和post的区别

```javascript
get--
*       是比较常见的请求，通常用于向服务器查询信息，数据是拼接在接口后面的,也就是拼接到?后
*       由于数据是拼接在接口后面，所以可能在浏览器的地址栏可以看到数据
*
*   post--
*       在请求的时候，需要设置请求头信息,而且是在send()发送数据
*
*   get方式为什么网上说，传输的数据有上限？
*   因为不是get方式不允许进行大批量数据传输，而是因为get方法的数据都在url里，而浏览器会有一个对url长度的限制
*
*   安全性？只要不加密，两者都不安全。
*   get能在地址栏看到数据，post数据

//键值对,通过键值，就可获取不同的值
//user=123
//pwd=456
```

#### get方式获取数据

```html
用户名：<input type="text" id="userID"><br>
密码：<input type="password" id="pwdID"><br>
<button id="btn">提交</button>
```

```javascript
var oBtn = document.getElementById("btn");

oBtn.onclick = function () {
    var user = userID.value,
        pwd = pwdID.value;

    var data = '?user=' +user+ '&pwd=' +pwd;
    //var data = 'user=' +user+ '&pwd=' +pwd;//post方式
    //data是发送到后台到数据


    var xhr = new XMLHttpRequest();

    //xhr.open('get','http://127.0.0.1:3000?user=fengyu&pwd=123456');//传递方式大小写都可以
    xhr.open('get','http://localhost:3000'+data,true);

    //get方法
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send('user=123&pwd=456');

    //xhr.send();
    //post方法
    //xhr.open('post','http://localhost:3000',true);
    //xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    //xhr.send(data);

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status <300 || xhr.status === 304) {
                //数据能拿到了
                console.log(xhr.responseText);
            }
        }
    }
}
```

#### post方法获取数据

```javascript
var oBtn = document.getElementById("btn");

oBtn.onclick = function () {
    var user = userID.value,
        pwd = pwdID.value;

    var data = 'user=' +user+ '&pwd=' +pwd;


    var xhr = new XMLHttpRequest();


    //post方法
    xhr.open('post','http://localhost:3000',true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send(data);

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status <300 || xhr.status === 304) {
                //数据能拿到了
                //console.log(xhr.responseText);
                console.log(xhr.getResponseHeader('Content-Type'));//后台没有设置响应头的时候返回null
            }
        }
    }
}
```

#### 封装ajax

```javascript
var http = require('http');
var url = require('url');
var qs = require('querystring');

http.createServer(function (req, res) {
    //req --> 请求体
    //res --> 响应体

    //允许跨域访问
    res.setHeader('Access-Control-Allow-Origin','*');
    //设置响应头
    res.writeHead(201,{'Content-Type':'text/plain'});//状态码和响应头返回纯文本形式，console出text/plain，还可以返回html

    if (req.method === "GET") {

        var obj = url.parse(req.url,true);

        //下面是后台返回的数据
        res.write('[GET方式]你好，输入的用户名是：'+obj.query.user + ',密码是:'+obj.query.pwd);

        res.end();


    } else if (req.method === "POST") {
        console.log('已经通过post方法');
        var str = "",
            obj = {};

        req.on('data',function (data) {
            str += data;
        });
        req.on('end',function () {
            obj = qs.parse(str);
            console.log(obj);
            res.write('[POST方式]你好，你输入的用户名是:' +obj.user +',密码是:'+obj.pwd);
            res.end();
        })
    }
}).listen(3000);//端口号，避免占用80
console.log('正在监听');
```

![](/Users/selinnn/FrontEnd/JS精英实验班课堂操作&作业/笔记/pic/11.png)

