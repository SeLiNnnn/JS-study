# 一、JSON

#### 1 、创建对象（JSON）

> 对象是Javascript的基本数据结构，对象是引用类型 
> 创建对象的三种方式 `对象直接量`，`new Oject()`, `Object.create({})`[ ES5 ],create创建需要一个对象参数

```javascript
//直接量
var  obj = {}

//new
var  obj = new Object()

//ES5
var  obj = Object.create()
```

- 对象都是一个`key(键)`:`value( 值 )`一一对应
- age为对象的`key(键)`，或obj的age属性
- 20为age 的`value( 值 )`

------

> ```
> 严格是对象为JSON
> ```

```javascript
//对象
var obj = {  age: 20,name: '小黑', }

//JSON
var obj = {  'age' : 20,'name': '小黑', }
```

------

#### 2 、访问JSON的值

obj`.`attribute 
`obj[`attribute`]`

```javascript
var  obj = {
	age: 20,
    name: '小黑',
    sex: '男'
}
alert( obj.age ) //20

//或
alert( obj[age] ) //20
```

------

#### 3 、修改JSON的属性值

```javascript
var obj = { name: '小黑'};
obj.name  = '二狗';

//或
obj[name ] = '二狗';
```

------

#### 3 、添加JSON属性

```javascript
var obj = {};
obj.name = 'hello';
```

------

#### 4 、删除JSON属性

`delete` 可以删除对象属性

```javascript
var obj = {};
obj.name = 'hello';
delete obj.name 

//或
delete obj[name] 
```

#### 5 、JSON数字属性

```javascript
var obj = {
    age: 20,
    name: '小黑',
    sex: '男'
};
obj[0] = 'hello';
obj[1] = 'AAA';
```

#### 6、`in` 判断对象是否存在某个属性

```javascript
var   obj = { hello:123};
alert( 'hello' in obj );//true
```

#### 7、复习[]取值

```javascript
var json = {
    name : "abc",
    age : 111
};

var a = "name";

console.log(json[a]);//不能使用.操作了，这里的a不是json里的某个属性,而是一个变量，且是字符串所以用[]

//定义json的时候，属性是不能访问到外面的变量，但值可以用变量来代替
var b = "abc";
var json = {
    "name" : b,
    age : 111
};
console.log(json.name);
```

# 二 、for in遍历json

#### 1、for in 遍历JSON

```javascript
var oW = document.getElementById("wrap");

var json = {
    name : "selin",
    age : 21,
    sex : 1,
    marry : false,
    handsome : true
};

//只有for in 可以遍历对象的所有属性
//变量 in 对象 这个变量代表所有的属性

var str = "";

for (var key in json) {
    // console.log(key);//出现5次，分别是name,age,sex,marry,handsome,不同浏览器的排序规则可能不同
    // console.log(json[key]);//要取到key这个字符串的值，只能用[]不能用.
    str += "<p>"+key+"<===>"+json[key]+"</p>";
}
oW.innerHTML = str;
```

```javascript
//案例 用表格输出数据
var oW = document.getElementById("wrap");
var j = {
    a : 10,
    b : 20,
    c : 30,
    key : [
        {
            a : 1,
            b : 2
        }
    ]
};

var str = "<table><tr><td>属性:</td><td>值:</td></tr>";

var x = j.key[0];

for (var i in x) {
    //console.log(j[i]);
    str += "<tr><td>"+i+"</td><td>"+j[i]+"</td></tr>";
}

str += "</table>";

oW.innerHTML = str;
```

##### !!!! for 循环不能遍历JSON

#### 2、for in 遍历数组

```javascript
var arr = [1,2,3,4,5,6];
arr.jj = 9999;

for (var key in arr) {
    //console.log((typeof key));//string
    console.log(arr[key]);//通常不用for in来遍历数组，因为for in会遍历所有的属性包括自定义属性，
    // 但有时候我们只想遍历本身属性
}
```

