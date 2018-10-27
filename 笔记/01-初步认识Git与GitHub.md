# 初步了解Git与Github

1.概念

	Github：一个网站，我们可将项目放在这里进行托管，也可以在这里找到最新最前沿最牛逼的技术，也是全球最大的同性交友平台。

	Git：一个软件，需要下载安装，用来在开发工程中进行版本控制。Github利用Git来实现项目的版本控制，提交等。Git不仅仅只能服务于Github，因为项目托管平台不仅只有Github，还有很多，但Github是最流行的托管平台。

2.开始使用

推荐廖雪峰老师的Git教程。

3.一些常用的Git命令

```
【创建git仓库】
$ mkdir test //test仓库名
$ cd learngit  
$ pwd //显示仓库位置
// /Users/selinnn/test

【初始化仓库】
git init; //把这个目录变成git可以管理的仓库
//Initialized empty Git repository in /Users/selinnn/test/.git/

【添加文件到Git仓库，分两步：】
1.使用git add<filePath>，添加到版本库，可反复多次使用，添加多个文件
2.使用git commit，提交到版本库，一次可以提交多个文件，完成

创建好后，会自动生成.git文件
如果没有看到.git目录，那是因为这个文件默认是隐藏的，用ls -ah命令可以看见
//.	..	.git

【新建一个文件，文件里写如下两行内容:】
Git is a version control system.
Git is free software.
注意一定要放到仓库目录下,把文件添加到版本库
1.添加文件
$ git add readme.txt
执行上面的命令，没有任何显示，这就对了，Unix的哲学是“没有消息就是好消息”，说明添加成功。
2.把文件提交到仓库
$ git commit -m "wrote a readme file"
-m后面输入的是本次提交的说明
git commit命令执行成功后会告诉你，1 file changed：1个文件被改动（我们新添加的readme.txt文件）；2 insertions：插入了两行内容（readme.txt有两行内容）。
[master (root-commit) e8ad70d] wrote a readme file
 1 file changed, 2 insertions(+)
 create mode 100644 readme.txt

Q?为什么Git添加文件需要add，commit一共两步呢？因为commit可以一次提交很多文件，所以你可以多次add不同的文件，比如：
$ git add file1.txt
$ git add file2.txt file3.txt
$ git commit -m "add 3 files."

【查看仓库状态】
-要随时掌握工作区的状态，使用git status命令
-如果git status告诉你有文件被修改，用git diff可以查看修改的内容。

修改readme.txt文件:
Git is a distributed version control system.
Git is free software.

查看仓库状态$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)
	modified:   readme.txt
		no changes added to commit (use "git add" and/or "git commit -a")

上面的命令输出告诉我们，readme.txt被修改过了，但还没有准备提交的修改。
【使用git diff命令查看修改内容：】
$ git diff readme.txt
diff --git a/readme.txt b/readme.txt
index d8036c1..013b5bc 100644
--- a/readme.txt
+++ b/readme.txt
@@ -1,2 +1,2 @@
-Git is a version control system.
+Git is a distributed version control system.
 Git is free software.
\ No newline at end of file
git diff顾名思义就是查看difference，显示的格式正是Unix通用的diff格式，可以从上面的命令输出看到，我们在第一行添加了一个distributed单词

知道了对readme.txt作了什么修改后，再把它提交到仓库
【提交修改和提交新文件是一样的两步:】
第一步 git add：
同样没有任何输出。在执行第二步git commit之前，我们再运行git status看看当前仓库的状态：
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)
	modified:   readme.txt
git status告诉我们，将要被提交的修改包括readme.txt，下一步，就可以放心地提交了：
$ git commit -m "add distributed"
[master ff1cbee] add distributed
 1 file changed, 1 insertion(+), 1 deletion(-)

提交后，我们再用git status命令看看仓库的当前状态：
$ git status
On branch master
nothing to commit, working tree clean
Git告诉我们当前没有需要提交的修改，而且，工作目录是干净（working tree clean）的。

现在，再次修改readme.txt文件如下：
Git is a distributed version control system.
Git is free software distributed under the GPL.
尝试提交：
$ git add readme.txt
$ git commit -m "append GPL"
[master 3fde128] append GPL
 1 file changed, 1 insertion(+), 1 deletion(-)

现在，我们回顾一下readme.txt文件一共有几个版本被提交到Git仓库里了：
版本1：wrote a readme file
版本2：add distributed
版本3：append GPL
当然了，在实际工作中，我们脑子里怎么可能记得一个几千行的文件每次都改了什么内容，不然要版本控制系统干什么。版本控制系统肯定有某个命令可以告诉我们历史记录，在Git中，我们用git log命令查看：
【$ git log】
commit 3fde128e902ae46692c3e904e2ffec1566e71d95 (HEAD -> master)
Author: selin0410 <selin.cd@foxmail.com>
Date:   Sat Sep 22 20:05:40 2018 +0800

    append GPL

commit ff1cbee7668a157a7223717ad22924966fcaae8b
Author: selin0410 <selin.cd@foxmail.com>
Date:   Sat Sep 22 20:01:26 2018 +0800

    add distributed

commit e8ad70d407770f3de4c1a6a3ad5d17997127971c
Author: selin0410 <selin.cd@foxmail.com>
Date:   Sat Sep 22 19:39:32 2018 +0800

    wrote a readme file
    
git log命令显示从最近到最远的提交日志，我们可以看到3次提交，最近的一次是append GPL，上一次是add distributed，最早的一次是wrote a readme file。
如果嫌输出信息太多，看得眼花缭乱的，可以试试加上--pretty=oneline参数：
【$ git log --pretty=oneline】
3fde128e902ae46692c3e904e2ffec1566e71d95 (HEAD -> master) append GPL
ff1cbee7668a157a7223717ad22924966fcaae8b add distributed
e8ad70d407770f3de4c1a6a3ad5d17997127971c wrote a readme file

需要友情提示的是，看到的一大串类似1094adb...的是commit id（版本号），和SVN不一样，Git的commit id不是1，2，3……递增的数字，而是一个SHA1计算出来的一个非常大的数字，用十六进制表示，而且你看到的commit id和我的肯定不一样，以你自己的为准。为什么commit id需要用这么一大串数字表示呢？因为Git是分布式的版本控制系统，后面我们还要研究多人在同一个版本库里工作，如果大家都用1，2，3……作为版本号，那肯定就冲突了。
每提交一个新版本，实际上Git就会把它们自动串成一条时间线。如果使用可视化工具查看Git历史，就可以更清楚地看到提交历史的时间线.

【版本回退】
-HEAD指向的版本就是当前版本的，因此Git允许我们在版本的历史之间穿梭，使用命令git reset --hard commit_id.

现在我们启动时光穿梭机，准备把readme.txt回退到上一个版本，也就是add distributed的那个版本，怎么做呢？
首先，Git必须知道当前版本是哪个版本，在Git中，用HEAD表示当前版本，也就是最新的提交1094adb...（注意我的提交ID和你的肯定不一样），上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。
现在，我们要把当前版本append GPL回退到上一个版本add distributed，就可以使用git reset命令：
$ git reset --hard HEAD^
HEAD is now at ff1cbee add distributed
--hard参数有啥意义？这个后面再讲，现在你先放心使用。
看看readme.txt的内容是不是版本add distributed：
$ cat readme.txt
Git is a distributed version control system.
Git is free software.

还可以继续回退到上一个版本wrote a readme file，不过且慢，然我们用git log再看看现在版本库的状态：
$ git log
commit ff1cbee7668a157a7223717ad22924966fcaae8b (HEAD -> master)
Author: selin0410 <selin.cd@foxmail.com>
Date:   Sat Sep 22 20:01:26 2018 +0800

    add distributed

commit e8ad70d407770f3de4c1a6a3ad5d17997127971c
Author: selin0410 <selin.cd@foxmail.com>
Date:   Sat Sep 22 19:39:32 2018 +0800

    wrote a readme file

最新的那个版本append GPL已经看不到了！好比你从21世纪坐时光穿梭机来到了19世纪，想再回去已经回不去了，肿么办？
办法其实还是有的，只要上面的命令行窗口还没有被关掉，你就可以顺着往上找啊找啊，找到那个append GPL的commit id是commit ff1cbee7668a157a7223717ad22924966fcaae8b于是就可以指定回到未来的某个版本：
$ git reset --hard 3fde128
HEAD is now at 3fde128 append GPL
版本号没必要写全，前几位就可以了，Git会自动去找。当然也不能只写前一两位，因为Git可能会找到多个版本号，就无法确定是哪一个了。
再小心翼翼地看看readme.txt的内容：
$ cat readme.txt
Git is a distributed version control system.
Git is free software distributed under the GPL.
```

果然，我胡汉三又回来了。
Git的版本回退速度非常快，因为Git在内部有个指向当前版本的HEAD指针，当你回退版本的时候，Git仅仅是把HEAD从指向append GPL：
![git0](/Users/selinnn/FrontEnd/JS精英实验班课堂操作&作业/笔记/pic/git0.jpg)
改为指向add distributed：
![git1](/Users/selinnn/FrontEnd/JS精英实验班课堂操作&作业/笔记/pic/git1.jpg)


然后顺便把工作区的文件更新了。所以你让HEAD指向哪个版本号，你就把当前版本定位在哪。

```
现在，你回退到了某个版本，关掉了电脑，第二天早上就后悔了，想恢复到新版本怎么办？找不到新版本的commit id怎么办？

在Git中，总是有后悔药可以吃的。当你用$ git reset --hard HEAD^回退到add distributed版本时，再想恢复到append GPL，就必须找到append GPL的commit id。Git提供了一个命令git reflog用来记录你的每一次命令：
$ git reflog
3fde128 (HEAD -> master) HEAD@{0}: reset: moving to 3fde128
ff1cbee HEAD@{1}: reset: moving to HEAD^
3fde128 (HEAD -> master) HEAD@{2}: commit: append GPL
ff1cbee HEAD@{3}: commit: add distributed
e8ad70d HEAD@{4}: commit (initial): wrote a readme file
终于舒了口气，从输出可知，append GPL的commit id是3fde128，现在，你又可以乘坐时光机回到未来了。
```

#### 工作区和暂存区

Git和其他版本控制系统如SVN的一个不同之处就是有暂存区的概念。

先来看名词解释。

#### 工作区（Working Directory）

就是在电脑里能看到的目录，比如test文件夹就是一个工作区

#### 版本库（Repository）

工作区有一个隐藏目录`.git`，这个不算工作区，而是Git的版本库。

Git的版本库里存了很多东西，其中最重要的就是称为stage（或者叫index）的暂存区，还有Git为我们自动创建的第一个分支`master`，以及指向`master`的一个指针叫`HEAD`。

![git2](/Users/selinnn/FrontEnd/JS精英实验班课堂操作&作业/笔记/pic/git2.jpg)

分支和`HEAD`的概念我们以后再讲。

```
前面讲了我们把文件往Git版本库里添加的时候，是分两步执行的：
第一步是用git add把文件添加进去，实际上就是把文件修改添加到暂存区；
第二步是用git commit提交更改，实际上就是把暂存区的所有内容提交到当前分支。
因为我们创建Git版本库时，Git自动为我们创建了唯一一个master分支，所以，现在，git commit就是往master分支上提交更改。
你可以简单理解为，需要提交的文件修改通通放到暂存区，然后，一次性提交暂存区的所有修改。

现在，我们再练习一遍，先对readme.txt做个修改，比如加上一行内容：
Git is a distributed version control system.
Git is free software distributed under the GPL.
Git has a mutable index called stage.

然后，在工作区新增一个LICENSE文本文件（内容随便写）。
先用git status查看一下状态：
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   readme.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	LICENSE.txt

no changes added to commit (use "git add" and/or "git commit -a")

Git非常清楚地告诉我们，readme.txt被修改了，而LICENSE还从来没有被添加过，所以它的状态是Untracked。
现在，使用两次命令git add，把readme.txt和LICENSE都添加后，用git status再查看一下：
$ git add readme.txt
$ git add LICENSE.txt
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   LICENSE.txt
	modified:   readme.txt
```

现在，暂存区的状态就变成这样了：

![git3](/Users/selinnn/FrontEnd/JS精英实验班课堂操作&作业/笔记/pic/git3.jpg)

```
所以，git add命令实际上就是把要提交的所有修改放到暂存区（Stage），然后，执行git commit就可以一次性把暂存区的所有修改提交到分支。
$ git commit -m "understand how stage works"
[master 3a7db9e] understand how stage works
 2 files changed, 3 insertions(+), 1 deletion(-)
 create mode 100644 LICENSE.txt

一旦提交后，如果你又没有对工作区做任何修改，那么工作区就是“干净”的：
$ git status
On branch master
nothing to commit, working tree clean
```

现在版本库变成了这样，暂存区就没有任何内容了：

![git4](/Users/selinnn/FrontEnd/JS精英实验班课堂操作&作业/笔记/pic/git4.jpg)

```
下面，我们要讨论的就是，为什么Git比其他版本控制系统设计得优秀，因为Git跟踪并管理的是修改，而非文件。
你会问，什么是修改？比如你新增了一行，这就是一个修改，删除了一行，也是一个修改，更改了某些字符，也是一个修改，删了一些又加了一些，也是一个修改，甚至创建一个新文件，也算一个修改。

为什么说Git管理的是修改，而不是文件呢？我们还是做实验。第一步，对readme.txt做一个修改，比如加一行内容：
Git has a mutable index called stage.

使用git cat查看
$ cat readme.txt
Git is a distributed version control system.
Git is free software distributed under the GPL.
Git has a mutable index called stage.
Git tracks changes.

然后，添加：
$ git add readme.txt
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   readme.txt
	
然后，再修改readme.txt：
Git tracks changes of files.
查看：
$ cat readme.txt
Git is a distributed version control system.
Git is free software distributed under the GPL.
Git has a mutable index called stage.
Git tracks changes of files.
提交：
$ git commit -m "git tracks change"
[master 18425b4] git tracks change
 1 file changed, 2 insertions(+), 1 deletion(-)
 提交后，再看看状态：
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")

咦，怎么第二次的修改没有被提交？

别激动，我们回顾一下操作过程：
第一次修改 -> git add -> 第二次修改 -> git commit
你看，我们前面讲了，Git管理的是修改，当你用git add命令后，在工作区的第一次修改被放入暂存区，准备提交，但是，在工作区的第二次修改并没有放入暂存区，所以，git commit只负责把暂存区的修改提交了，也就是第一次的修改被提交了，第二次的修改不会被提交。

提交后，用git diff HEAD -- readme.txt命令可以查看工作区和版本库里面最新版本的区别：
$ git diff HEAD -- readme.txt
diff --git a/readme.txt b/readme.txt
index db28b2c..9a8b341 100644
--- a/readme.txt
+++ b/readme.txt
@@ -1,4 +1,4 @@
 Git is a distributed version control system.
 Git is free software distributed under the GPL.
 Git has a mutable index called stage.
-Git tracks changes.
\ No newline at end of file
+Git tracks changes of files.
\ No newline at end of file
可见，第二次修改确实没有被提交。
管理修改
阅读: 698354
现在，假定你已经完全掌握了暂存区的概念。下面，我们要讨论的就是，为什么Git比其他版本控制系统设计得优秀，因为Git跟踪并管理的是修改，而非文件。

你会问，什么是修改？比如你新增了一行，这就是一个修改，删除了一行，也是一个修改，更改了某些字符，也是一个修改，删了一些又加了一些，也是一个修改，甚至创建一个新文件，也算一个修改。

为什么说Git管理的是修改，而不是文件呢？我们还是做实验。第一步，对readme.txt做一个修改，比如加一行内容：

$ cat readme.txt
Git is a distributed version control system.
Git is free software distributed under the GPL.
Git has a mutable index called stage.
Git tracks changes.
然后，添加：

$ git add readme.txt
$ git status
# On branch master
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
#       modified:   readme.txt
#
然后，再修改readme.txt：

$ cat readme.txt 
Git is a distributed version control system.
Git is free software distributed under the GPL.
Git has a mutable index called stage.
Git tracks changes of files.
提交：

$ git commit -m "git tracks changes"
[master 519219b] git tracks changes
 1 file changed, 1 insertion(+)
提交后，再看看状态：

$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
咦，怎么第二次的修改没有被提交？

别激动，我们回顾一下操作过程：

第一次修改 -> git add -> 第二次修改 -> git commit

你看，我们前面讲了，Git管理的是修改，当你用git add命令后，在工作区的第一次修改被放入暂存区，准备提交，但是，在工作区的第二次修改并没有放入暂存区，所以，git commit只负责把暂存区的修改提交了，也就是第一次的修改被提交了，第二次的修改不会被提交。

提交后，用git diff HEAD -- readme.txt命令可以查看工作区和版本库里面最新版本的区别：

$ git diff HEAD -- readme.txt 
diff --git a/readme.txt b/readme.txt
index 76d770f..a9c5755 100644
--- a/readme.txt
+++ b/readme.txt
@@ -1,4 +1,4 @@
 Git is a distributed version control system.
 Git is free software distributed under the GPL.
 Git has a mutable index called stage.
-Git tracks changes.
+Git tracks changes of files.
可见，第二次修改确实没有被提交。
 那怎么提交第二次修改呢？你可以继续git add再git commit，也可以别着急提交第一次修改，先git add第二次修改，再git commit，就相当于把两次修改合并后一块提交了：
第一次修改 -> git add -> 第二次修改 -> git add -> git commit
$ git add readme.txt
$ git commit -m "second commit"
[master 8510b7d] second commit
 1 file changed, 1 insertion(+), 1 deletion(-)
$ git status
On branch master
nothing to commit, working tree clean


```



```
为什么GitHub需要SSH Key呢？因为GitHub需要识别出你推送的提交确实是你推送的，而不是别人冒充的，而Git支持SSH协议，所以，GitHub只要知道了你的公钥，就可以确认只有你自己才能推送。

当然，GitHub允许你添加多个Key。假定你有若干电脑，你一会儿在公司提交，一会儿在家里提交，只要把每台电脑的Key都添加到GitHub，就可以在每台电脑上往GitHub推送了。

最后友情提示，在GitHub上免费托管的Git仓库，任何人都可以看到喔（但只有你自己才能改）。所以，不要把敏感信息放进去。
如果你不想让别人看到Git库，有两个办法，一个是交点保护费，让GitHub把公开的仓库变成私有的，这样别人就看不见了（不可读更不可写）。另一个办法是自己动手，搭一个Git服务器，因为是你自己的Git服务器，所以别人也是看不见的。这个方法我们后面会讲到的，相当简单，公司内部开发必备。

确保你拥有一个GitHub账号后，我们就即将开始远程仓库的学习。

```



# 三、初识Javasript

## 1.JavaScript（JS）是什么

- JavaScript一种直译式脚本语言，是一种动态类型、弱类型、基于原型的语言。
- JavaScript通常用来操作HTML页面，响应用户操作，验证传输数据等
- java和JavaScript有什么关系？java和JavaScript没有关系
- jQuery和JavaScript有什么关系？jQuery是由JS编写的一个js库。

## 2.JS代码写在哪里？

JavaScript代码可以写在页面的：

- [内嵌 js](http://js)，**==最好写在body结束标签之前==**
- [外链 js文件里面，利用src属性引入](http://js)

*当script用src来引入外部js文件时，那么这个script标签里面就不能在写代码了。

- [标签属性里面（不推荐）](http://js)；

  1. script标签中的属性`type="text/javascript"`或language=”javascript”，HTML5新规则下可以什么都不用加；
  2. script标签可以放置于任何位置，不同的位置要注意加载顺序，通常放在head或body结束之前；
  3. 当script标签规定了defer="defer"这个标签属性后，这个script标签引入的js会等到html文档结构加载完之后才运行。
  <script defer="defer">

  ​

  ## 4.写JS代码需要注意什么

  1. 严格`区分大小写`；
  2. 语句字符都是半角字符；（字符串里面可以使任意字符）
  3. 某些完整语句后面要写分号 (`;`)；
  4. 代码要`缩进`，缩进要对齐。

  ​
