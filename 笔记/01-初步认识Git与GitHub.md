# 初步了解Git与Github

1.概念

​	Github：一个网站，我们可将项目放在这里进行托管，也可以在这里找到最新最前沿最牛逼的技术，也是全球最大的同性交友平台。

​	Git：一个软件，需要下载安装，用来在开发工程中进行版本控制。Github利用Git来实现项目的版本控制，提交等。Git不仅仅只能服务于Github，因为项目托管平台不仅只有Github，还有很多，但Github是最流行的托管平台。

2.开始使用

推荐廖雪峰老师的Git教程。

3.一些常用的Git命令

```
操作Git

初始化仓库

使用git init;

添加文件到Git仓库，分两步：

1.使用git add<filePath>，可反复多次使用，添加多个文件
2.使用git commit，提交到版本库，完成

查看仓库状态
-要随时掌握工作区的状态，使用git status命令
-如果git status告诉你有文件被修改，用git diff可以查看修改的内容。

版本回退
-HEAD指向的版本就是当前版本的，因此Git允许我们在版本的历史之间穿梭，使用命令git reset --hard commit_id.
```



# 三、初识Javasript

## 1.JavaScript（JS）是什么

- JavaScript一种直译式脚本语言，是一种动态类型、弱类型、基于原型的语言。
- JavaScript通常用来操作HTML页面，响应用户操作，验证传输数据等
- java和JavaScript有什么关系？java和JavaScript没有关系
- jQuery和JavaScript有什么关系？jQuery是由JS编写的一个js库。

## 2.JS代码写在哪里？

JavaScript代码可以写在页面的

- [内嵌 js](http://js)，
- [外链 js文件里面，利用src属性引入](http://js)

*当script用src来引入外部js文件时，那么这个script标签里面就不能在写代码了。

- [标签属性里面（不推荐）](http://js)；

  1. script标签中的属性`type="text/javascript"`或language=”javascript”，HTML5新规则下可以什么都不用加；
  2. script标签可以放置于任何位置，不同的位置要注意加载顺序，通常放在head或body结束之前；
  3. 当script标签规定了defer="defer"这个标签属性后，这个script标签引入的js会等到html文档结构加载完之后才运行。

  ​

  ## 4.写JS代码需要注意什么

  1. 严格`区分大小写`；
  2. 语句字符都是半角字符；（字符串里面可以使任意字符）
  3. 某些完整语句后面要写分号 (`;`)；
  4. 代码要`缩进`，缩进要对齐。

  ​

  ## 