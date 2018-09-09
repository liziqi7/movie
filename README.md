### 慕课网 - Node.js+MongoDB建站攻略（一期）参考源码

> *在线学习的动力来自于无私的分享，如果对您有帮助，请给我个Star。*

此程序基于慕课网Scott老师的[node+mongodb 建站攻略（一期）](http://www.imooc.com/learn/75)视频教程编写，当前所有模块程序均为最新版本，截止2018年9月，代码中包含详细的注释，非常适合初学者。

#### Demo使用流程
##### 1、 **本地环境安装`Node.js`**
* 1.1、 具体的安装方法，建议多看几篇博客文章，熟悉后再去尝试。如果不考虑对Node.js进行版本管理（_适用于对**Node.js**有一定了解的同学_），安装时可以一路**next**。
* 1.2、 Node.js中文网：[nodejs.cn](http://nodejs.cn/)
* 1.3、 Node.js中文网提供的下载页：[传送门](http://nodejs.cn/download/)，选择操作系统对应的版本下载。
* 1.4、 检测Node.js是否安装成功，命令窗口[cmd]`$ node -v`。若出现具体的版本号，表示安装成功。
window系统推荐使用powersheell 来输入命令。
![使用powersheell 来输入命令](./1.png)
![Node.js是否安装成功检测](./2.png)


##### 2、 **安装`MongoDB`**
* 2.1、MongoDB官网[www.mongodb.com](https://www.mongodb.com/)
* 2.2、MongoDB中文社区[www.mongoing.com](http://www.mongoing.com/)
* 2.1、 MongoDB中文网：[mongodb.org.cn](http://www.mongodb.org.cn/)
* 2.2、 MongoDB下载链接：[传送门](https://www.mongodb.com/download-center#atlas)
* 2.3、 MongoDB中文网教程（包含安装）：[传送门](http://www.mongodb.org.cn/tutorial/)
*![MongoDB中文网教程](./3.png)
* 2.4、 检测MongoDB是否安装成功，命令窗口[cmd]`$ mongo -version`。若出现具体的版本号，表示安装成功。
![MongoDB安装成功输出信息](./4.png)

* 2.5、 MongoDB安装成功后，将安装路径下的`bin`目录，例如本人的是：`"C:\Program Files\MongoDB\Server\4.0\bin"`添加到系统环境变量，这样便可以直接在命令窗口[cmd]直接执行bin文件里面的命令。
![bin文件目录](./5.png)
* 2.6、 例如：Windows 7环境变量添加流程。
计算机(右键)→选择[属性]→选择[高级系统设置]→选择[高级]→点击[环境变量]→ 选择[系统变量]中变量`Pah` 点击[编辑]在末尾添加地址
```
//使用英文;分割
;C:\Program Files\MongoDB\Server\4.0\bin
```
添加配置之后，记得**重开powersheell 窗口**，验证是否生效。
![环境变量添加流程](./6.png)

* 2.7、 设置存储路径，建议在C盘下创建`C:/data/db`目录文件夹，这是MongoDB数据库默认的数据存储路径，但需要手动创建。

##### 3、 启动`MongoDB`服务：`mongod`
* 3.1、 如果本地存在`C:/data/db`文件夹，命令窗口[cmd]`$ mongod`，便可开启MongoDB服务，启动后**请勿关闭窗口**;
![]mongod开启服务](./7.png)
* 3.2、 同时，再新开一个命令窗口[cmd]`$ mongo`，就可以用命令来管理数据库，例如：数据的**增删改查**；


##### 4、 安装`bower`：`$ npm install -g bower`
* 4.1、 在movie项目文件夹下，按住`shift`键的同时按下鼠标右键，选择在此处打开命令窗口，执行命令：`$ npm install -g bower`；


##### 5、 安装`npm`依赖：`$ npm install`
* 5.1、 在movie项目文件夹下，按住`shift`键的同时按下鼠标右键，选择在此处打开命令窗口，执行命令：`$ npm install`；

附：解决npm包慢(失败)方法
>解决方案是换源.
```
# 默认源
npm config set registry https://registry.npmjs.org

# https -> http，这样网速就会好很多
npm config set registry http://registry.npmjs.org 

# 如果还不能下载，就切换成淘宝源
npm config set registry https://registry.npm.taobao.org

# 配置后可通过下面方式来验证是否成功
npm config get registry
# 或npm info express

```


##### 6、 启动项目入口文件：`$ node app.js`
* 6.1、 在movie项目文件夹下，按住`shift`键的同时按下鼠标右键，选择在此处打开命令窗口，执行命令：`$ node app`；

##### 7、 浏览器查看效果
* 7.1、  `http://localhost:3000`查看首页效果。
* 7.2、  `http://localhost:3000/admin/list`列表页
* 7.3、  `http://localhost:3000/admin/movie`后台录入页

**至此，本案例源码使用流程介绍完毕。在此过程遇到问题的同学，请前往[评论区](https://github.com/liziqi7/movie/issues/)留言。**
