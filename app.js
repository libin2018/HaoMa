var express = require('express');
var request = require('request');
var redis = require('redis');
var app = express();

app.get('/:id', function (req, res) {
    // redis 链接
    var client = redis.createClient('6379', '127.0.0.1');
    // redis 链接错误
    client.on("error", function (error) {
        console.log(error);
    });
    // redis 验证 (reids.conf未开启验证，此项可不需要)
    client.auth("MetenCRM2017");
    //client.auth("foobared");

    if (req.params.id == "favicon.ico") { return; }

    var mobile = req.params.id;

    if (mobile.length != 11) {
        res.end(JSON.stringify("Mobile Error!"));
    }
    else {
        client.select('4', function (error) {
            if (error) {
                console.log(error);
            } else {
                client.hmget("MobileAddress", mobile.substring(0, 7), function (error, address) {
                    if (error) {
                        console.log(error);
                    } else {
                        if (address != "") {
                            address = address + "";
                            address = address.replace(/(\d){11}/g, mobile);

                            console.log("查询Redis 归属地:" + address);

                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                            //res.end(JSON.stringify(address));
                            res.end(address);
                            client.end(true);
                        }
                        else {
                            // 调用API查询
                            request("http://v.showji.com/Locating/showji.com2016234999234.aspx?m=" + mobile + "&output=json", function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    console.log("查询API 归属地:" + body);
                                    address = body;
                                    client.hmset("MobileAddress", mobile.substring(0, 7), address, function (error, result) {
                                        if (error) {
                                            console.log(error);
                                        }
                                        client.end(true);
                                    });

                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                                    //res.end(JSON.stringify(address));
                                    res.end(address);
                                }
                            });
                        }
                    }
                });
            }
        });
    }
});

var server = app.listen(8083, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
    //console.log("应用实例：http://localhost:8083/13926585591");
});