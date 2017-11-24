var express = require('express');
var request = require('request');
var redis = require('redis');
var app = express();

app.get('/:id', function (req, res) {
    // redis ����
    var client = redis.createClient('6379', '127.0.0.1');
    // redis ���Ӵ���
    client.on("error", function (error) {
        console.log(error);
    });
    // redis ��֤ (reids.confδ������֤������ɲ���Ҫ)
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

                            console.log("��ѯRedis ������:" + address);

                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                            //res.end(JSON.stringify(address));
                            res.end(address);
                            client.end(true);
                        }
                        else {
                            // ����API��ѯ
                            request("http://v.showji.com/Locating/showji.com2016234999234.aspx?m=" + mobile + "&output=json", function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    console.log("��ѯAPI ������:" + body);
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
    console.log("Ӧ��ʵ�������ʵ�ַΪ http://%s:%s", host, port);
    //console.log("Ӧ��ʵ����http://localhost:8083/13926585591");
});