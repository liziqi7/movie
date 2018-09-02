var express = require('express')
var path=require('path')

var port = process.env.PORT || 3000
var app = express();

app.set('views', './views/pages')
app.set('view engine', 'jade')
var bodyParser = require('body-parser');
// app.use(express.bodyParser())
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname,'bower_components')))
app.listen(port);
// app.set('port', port)

console.log('imooc started on port ' + port);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'imooc 首页',
        movies: [{
            title: '机械战警',
            _id: 1,
            poster: "http://g4.ykimg.com/05160000530EEB63675839160D0B79D5"
        }, {
            title: '机械战警',
            _id: 2,
            poster: "http://g4.ykimg.com/05160000530EEB63675839160D0B79D5"
        }, {
            title: '机械战警',
            _id: 3,
            poster: "http://g4.ykimg.com/05160000530EEB63675839160D0B79D5"
        }, {
            title: '机械战警',
            _id: 4,
            poster: "http://g4.ykimg.com/05160000530EEB63675839160D0B79D5"
        }, {
            title: '机械战警',
            _id: 5,
            poster: "http://g4.ykimg.com/05160000530EEB63675839160D0B79D5"
        }, {
            title: '机械战警',
            _id: 6,
            poster: "http://g4.ykimg.com/05160000530EEB63675839160D0B79D5"
        }]
    });
})

app.get('/movie/:id', function(req, res) {
    res.render('detail', {
        title: 'imooc 详情页',
        movie: {
            title: "机械战警",
            doctor: '何塞·帕迪里亚',
            country: '美国',
            year: 2014,
            poster: 'http://g4.ykimg.com/05160000530EEB63675839160D0B79D5',
            flash: 'http://player.youku.com/player.php/sid/XNjA2NDU2Nzk2/v.swf',
            summary: '2028年，专事军火开发的机器人公司Omni Corp.生产了大量装备精良的机械战警，他们被投入到惩治犯罪等行动中，取得显著的效果。罪犯横行的底特律市，嫉恶如仇、正义感十足的警察亚历克斯·墨菲（乔尔·金纳曼 饰）遭到仇家暗算，身体受到毁灭性破坏。借助于Omni公司天才博士丹尼特·诺顿（加里·奥德曼 饰）最前沿...',
            language: '英语'
        }
    });
})

app.get('/admin/movie', function(req, res) {
    res.render('admin', {
        title: 'imooc 后台录入页',
        movie: {
            title: '',
            doctor: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    });
})

app.get('/admin/list', function(req, res) {
    res.render('list', {
        title: 'imooc 列表页',
        movies: [{
        	_id:1,
            title: "机械战警",
            doctor: '何塞·帕迪里亚',
            country: '美国',
            year: 2014,
            poster: 'http://g4.ykimg.com/05160000530EEB63675839160D0B79D5',
            flash: 'http://player.youku.com/player.php/sid/XNjA2NDU2Nzk2/v.swf',
            summary: '简介：2028年，专事军火开发的机器人公司Omni Corp.生产了大量装备精良的机械战警，他们被投入到惩治犯罪等行动中，取得显著的效果。罪犯横行的底特律市，嫉恶如仇、正义感十足的警察亚历克斯·墨菲（乔尔·金纳曼 饰）遭到仇家暗算，身体受到毁灭性破坏。借助于Omni公司天才博士丹尼特·诺顿（加里·奥德曼 饰）最前沿...',
            language: '英语'
        }]
    });
})