# HaoMa
MobileAddress 手机归属地 

# 01 Linux 下安装Redis

下载地址：[http://redis.io/download](http://redis.io/download)，下载最新文档版本。

本教程使用的最新文档版本为 2.8.17，下载并安装：

3.2.10

```

$ cd /home/kenzo/
$ wget http://download.redis.io/releases/redis-3.2.10.tar.gz
$ tar xzf redis-3.2.10.tar.gz
$ cd redis-3.2.10
$ make

```

make完后 redis-2.8.17目录下会出现编译后的redis服务程序redis-server,还有用于测试的客户端程序redis-cli,两个程序位于安装目录 src 目录下：

下面启动redis服务.

```

$ cd src
$ ./redis-server

```

注意这种方式启动redis

使用的是默认配置。也可以通过启动参数告诉redis使用指定配置文件使用下面命令启动。

```

$ cd src
$ ./redis-server redis.conf

```

redis.conf是一个默认的配置文件。我们可以根据需要使用自己的配置文件。

启动redis服务进程后，就可以使用测试客户端程序redis-cli和redis服务交互了。 比如：


```

$ cd src
$ ./redis-cli
redis> set foo bar
OK
redis> get foo
"bar"

```

检查redis是否在运行


```
ps -aux|grep redis

```

尝试用密码登录并执行具体的命令看到可以成功执行

```
./redis-cli -h 127.0.0.1 -p 6379 -a foobared
redis 127.0.0.1:6379> keys *  
1) "myset"  
2) "mysortset"  
redis 127.0.0.1:6379> select 1  
OK  
redis 127.0.0.1:6379[1]> config get requirepass  
1) "requirepass"  
2) "myRedis"
```

后台运行Redis


# 02 CentOS 下安装 Node.js

## 1、下载源码，你需要在https://nodejs.org/en/download/下载最新的Nodejs版本，本文以v0.10.24为例:


```
cd /usr/local/src/
wget http://nodejs.org/dist/v6.11.2/node-v6.11.2.tar.gz
```

## 2、解压源码


```
tar zxvf node-v6.11.2.tar.gz
```


## 3、 编译安装


```
cd node-v6.11.2
./configure --prefix=/usr/local/node/6.11.2
make
make install
```


## 4、 配置NODE_HOME，进入profile编辑环境变量


```
vim /etc/profile
```


设置nodejs环境变量，在 

```
export PATH USER LOGNAME MAIL HOSTNAME HISTSIZE HISTCONTROL
```

一行的上面添加如下内容:

```
#set for nodejs
export NODE_HOME=/usr/local/node/6.11.2
export PATH=$NODE_HOME/bin:$PATH
```


:wq保存并退出，编译/etc/profile 使配置生效


```
source /etc/profile
```


验证是否安装配置成功


```
node -v
```


输出 v0.10.24 表示配置成功

npm模块安装路径


```
/usr/local/node/6.11.2/lib/node_modules/
```


注：Nodejs 官网提供了编译好的Linux二进制包，你也可以下载下来直接应用。

# 03 安装PM2

GitHub 地址：https://github.com/Unitech/pm2


介绍

PM2 是一个带有负载均衡功能的 Node 应用的进程管理器。

当你要把你的独立代码利用全部的服务器上的所有 CPU，并保证进程永远都活着，0 秒的重载， PM2 是完美的。它非常适合 IaaS 结构，但不要把它用于 PaaS 方案（随后将开发 Paas 的解决方案）。

备注：

SaaS、PaaS 和 IaaS 是云服务模式

SaaS 软件即服务，例如 Google 的 Gmail 邮箱服务，面向应用型用户

PaaS 平台即服务，例如 Google 的 GAE，面向开发型用户

IaaS 基础架构即服务，例如亚马逊的 AWS，IaaS
对于不知道新推出的应用程序/网站会有多成功的创业公司来说非常有用

请参考

云服务模式：SaaS、PaaS 和 IaaS，哪一种适合你？

主要特性

内建负载均衡（使用 Node cluster 集群模块）

后台运行

0 秒停机重载，我理解大概意思是维护升级的时候不需要停机.

具有 Ubuntu 和 CentOS 的启动脚本

停止不稳定的进程（避免无限循环）

控制台检测

提供 HTTP API

远程控制和实时的接口 API ( Nodejs 模块，允许和 PM2 进程管理器交互 )

测试过 Nodejs v0.11/v0.10/v0.8 版本，兼容 CoffeeScript，基于 Linux 和 MacOS。

安装

```
npm install -g pm2
```

用法

```
$ npm install pm2 -g     # 命令行安装 pm2 
$ pm2 start app.js -i 4  # 后台运行pm2，启动4个app.js 
                         # 也可以把'max' 参数传递给 start
                         # 正确的进程数目依赖于Cpu的核心数目
$ pm2 start app.js --name my-api # 命名进程
$ pm2 list               # 显示所有进程状态
$ pm2 monit              # 监视所有进程
$ pm2 logs               # 显示所有进程日志
$ pm2 stop all           # 停止所有进程
$ pm2 restart all        # 重启所有进程
$ pm2 reload all         # 0 秒停机重载进程 (用于 NETWORKED 进程)
$ pm2 stop 0             # 停止指定的进程
$ pm2 restart 0          # 重启指定的进程
$ pm2 startup            # 产生 init 脚本 保持进程活着
$ pm2 web                # 运行健壮的 computer API endpoint (http://localhost:9615)
$ pm2 delete 0           # 杀死指定的进程
$ pm2 delete all         # 杀死全部进程
```

运行进程的不同方式

```
$ pm2 start app.js -i max    # 根据有效CPU数目启动最大进程数目
$ pm2 start app.js -i 3      # 启动3个进程
$ pm2 start app.js -x        #用fork模式启动 app.js 而不是使用 cluster
$ pm2 start app.js -x -- -a 23   # 用fork模式启动 app.js 并且传递参数 (-a 23)
$ pm2 start app.js --name serverone  # 启动一个进程并把它命名为 serverone
$ pm2 stop serverone       # 停止 serverone 进程
$ pm2 start app.json        # 启动进程, 在 app.json里设置选项
$ pm2 start app.js -i max -- -a 23                   #在--之后给 app.js 传递参数
$ pm2 start app.js -i max -e err.log -o out.log  # 启动 并 生成一个配置文件
```

你也可以执行用其他语言编写的app  ( fork 模式):

```
$ pm2 start my-bash-script.sh    -x --interpreter bash
$ pm2 start my-python-script.py -x --interpreter python
```

0 秒停机重载：这项功能允许你重新载入代码而不用失去请求连接。

注意：
仅能用于 web 应用
运行于 Node 0.11.x 版本
运行于 cluster 模式（默认模式）

```
$ pm2 reload all
```

CoffeeScript:

```
$ pm2 start my_app.coffee  #这就是全部
```

PM2 准备好为产品级服务了吗？
只需在你的服务器上测试


```
$ git clone https://github.com/Unitech/pm2.git
$ cd pm2
$ npm install  # 或者 npm install --dev ，如果devDependencies 没有安装
$ npm test
```

pm2 list：列出由 PM2 管理的所有进程信息，还会显示一个进程会被启动多少次，因为没处理的异常。



pm2 monit：监视每个 node 进程的 CPU 和内存的使用情况。



# 04 启动应用

启动Redis:


```

$ cd /home/kenzo/redis-2.8.17/src

$ ./redis-server ../redis.conf

$ ps -aux|grep redis

$ kill -9 n

```

启动APP:

```

$ cd /home/kenzo/haoma/

$ pm2 start app.js --name haoma # 命名进程

$ pm2 monit


```

接口地址：

```
http://121.40.18.12:8083/13926585591

```

自动启动
1、Redis

配置环境

1. 根据启动脚本要求，将修改好的配置文件以端口为名复制一份到指定目录。需使用root用户。

```

mkdir /etc/redis
cp redis.conf /etc/redis/6379.conf

```

 2. 将启动脚本复制到/etc/init.d目录下，本例将启动脚本命名为redisd（通常都以d结尾表示是后台自启动服务）。

```

cp redis_init_script /etc/init.d/redisd

[root@freeswitch redis]# vi /etc/init.d/redisd
#!/bin/sh
#
# chkconfig:   2345 90 10
# description:  Redis is a persistent key-value database
#
# Simple Redis init.d script conceived to work on Linux systems
# as it does use of the /proc filesystem.

REDISPORT=6379
EXEC=/home/kenzo/redis-3.2.10/src/redis-server
CLIEXEC=/home/kenzo/redis-3.2.10/src/redis-cli

PIDFILE=/var/run/redis.pid
CONF="/etc/redis/${REDISPORT}.conf"

case "$1" in
    start)
        if [ -f $PIDFILE ]
        then
                echo "$PIDFILE exists, process is already running or crashed"
        else
                echo "Starting Redis server..."
                $EXEC $CONF
        fi
        ;;
    stop)
        if [ ! -f $PIDFILE ]
        then
                echo "$PIDFILE does not exist, process is not running"
        else
                PID=$(cat $PIDFILE)
                echo "Stopping ..."
                $CLIEXEC -p $REDISPORT -a foobared shutdown
                while [ -x /proc/${PID} ]
                do
                    echo "Waiting for Redis to shutdown ..."
                    sleep 1
                done
                echo "Redis stopped"
        fi
        ;;
    *)
        echo "Please use start or stop as first argument"
        ;;
esac


```

3.  设置为开机自启动

此处直接配置开启自启动 

```

chkconfig redisd on

```

将报错误： service redisd does not support chkconfig 
参照 此篇文章 ，在启动脚本开头添加如下两行注释以修改其运行级别：

```

#!/bin/sh
# chkconfig:   2345 90 10
# description:  Redis is a persistent key-value database

```

 再设置即可成功。

```

#设置为开机自启动服务器
chkconfig redisd on

#打开服务

service redisd start

#关闭服务
service redisd stop

```

2、PM2 开机启动设置

1. pm2 start运行你要开机启动的程序;

2. pm2 save;

3. 查看more ~/.pm2/dump.pm2这个文件是否已经有保存到数据;

4. pm2 startup


# 05 源代码

```
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
    client.auth("foobared");

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
                            // µ÷ÓÃAPI²éÑ¯
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
    //console.log("应用实例：http://localhost:8083/13800001234");
});


```
