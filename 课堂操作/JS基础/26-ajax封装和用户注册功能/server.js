const http = require("http"),
    url = require("url"),
    fs = require("fs");

http.createServer(function (req, res) {
    //允许被跨域访问
    res.setHeader('Access-Control-Allow-Origin', "*");
    if (req.method === "GET") {
        console.log("已接收到请求");
        let obj = url.parse(req.url, true);

        //读取数据库文件
        let myReadStream = fs.createReadStream(__dirname + "/./userinfo.txt","utf8");



        //监听
        let data = "";
        myReadStream.on("data",function (chunk) {
            data += chunk;
        });
        //是否结束
        let arr;//得到的数据是字符串，要转成obj才能遍历
        myReadStream.on("end", function () {
            data = data || "[]";
            arr = JSON.parse(data);

            var flag = false;//true就是用户名已经存在
            for (var i = 0, item; item = arr[i]; i++) {
                if (item.id === obj.query.id) {//判断客户端提交的数据是否已经存在数据库
                    flag = true;
                }
            }

            if (flag) {
                res.write('{"type" : 0, "msg":"用户名已注册"}');
                res.end();
            } else {
                //else代表用户名可以注册
                arr.push(obj.query);
                let  str = JSON.stringify(arr);


                fs.writeFile('./userinfo.txt', str, function (err) {
                    if (err)throw err;
                    console.log("文件保存成功");
                    res.write('{"type":1, "msg":"注册成功"}');
                    res.end();
                })
            }
        })

    }


}).listen(3000, function () {
    console.log("服务器启动成功，正在监听3000端口")
});