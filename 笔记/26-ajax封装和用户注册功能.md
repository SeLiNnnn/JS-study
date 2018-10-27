# 一、同步和异步执行顺序

```javascript
console.log(1);//同步

 setTimeout(function () {
     console.log(3);
 } ,0);//异步

 //ajax();//异步
 setTimeout(function () {
     console.log(4);
 });

 console.log(2);//同步

//输出顺序一定是1234 异步队列会等同步队列全部执行完后才执行
```

```javascript
//如果同步队列里有异步队列
fn();
function fn() {
    console.log(1);
    setTimeout(function () {
        console.log(6);
    } ,0)
}

console.log(2);
//输出顺序 126  不管是不是在同步队列里，只要是异步，就要等同步执行完了才能执行
```



# 二、ajax封装

```javascript
ajax({
    method : "post",
    url: "http://localhost:3000",
    async: true,//异步
    data:{
      name : "goudan",
      age : 18
    },
    timeout : 1000,//设置访问请求时间，超时就停止请求
    success : function (msg) {
        console.log(msg);
    },
    error : function (msg) {
        console.log(msg);
    }

});
```



# 三、用户注册功能暂有BUG