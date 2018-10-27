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