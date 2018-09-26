var express = require('express') // 加载express模块
var path = require('path') // 引入path模块
var cookieParser = require('cookie-parser') //加载cookie模块
var session = require('express-session') //加载session模块
var mongoose = require('mongoose') // 加载mongoose模块
var mongoStore = require('connect-mongo')(session);
var logger = require('morgan');

var port = process.env.PORT || 3000 // 设置端口号：3000
var app = express(); // 启动Web服务器
var dburl = 'mongodb://localhost/imooc';
// mongoose.connect('mongodb://localhost/imooc')// 老版本链接本地数据库方式

mongoose.connection.openUri(dburl) //连接mongodb本地数据库imovie
/*  mongoose 简要知识点补充
 * mongoose模块构建在mongodb之上，提供了Schema[模式]、Model[模型]和Document[文档]对象，用起来更为方便。
 * Schema对象定义文档的结构（类似表结构），可以定义字段和类型、唯一性、索引和验证。
 * Model对象表示集合中的所有文档。
 * Document对象作为集合中的单个文档的表示。
 * mongoose还有Query和Aggregate对象，Query实现查询，Aggregate实现聚合。
 * */

app.set('views', './app/views/pages') // 设置视图默认的文件路径
app.set('view engine', 'jade') // 设置视图引擎：jade
var bodyParser = require('body-parser'); // 因后台录入页有提交表单的步骤，故加载此模块方法（bodyParser模块来做文件解析），将表单里的数据进行格式化
var multipart = require('connect-multiparty');
app.use(multipart());

// var multer  = require('multer')
// app.use(multer());
// app.use(express.multipart())
// app.use(express.bodyParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// // 设置session
app.use(session({
    secret: 'imooc',
    store: new mongoStore({
        url: dburl,
        collection: 'sessions'
    })
}))

if ('development' == app.get('env')) {
    app.set('showStackError', true)
    // app.use(logger(':method :url :status'))
    app.locals.pretty = true;
    mongoose.set('debug', true)
} 

require('./config/routes')(app)




app.listen(port); // 监听 port[3000]端口
app.locals.moment = require('moment') // 载入moment模块，格式化日期
app.use(express.static(path.join(__dirname, 'public'))) //设置静态资源路径

// console.log('imooc started on port ' + port);