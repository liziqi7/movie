var Movie = require('../models/movie'); // 载入mongoose编译后的模型Movie
var Catetory = require('../models/catetory')
// 编写主要页面路由
// index page 首页
exports.index = function(req, res) {
    Catetory.find({}).populate({ path: 'movies', potions: { limit: 5 } }).exec(function(err, catetories) {
        if (err) console.log(err)
        res.render('index', { // 渲染index 首页
            title: 'imooc 首页',
            catetories: catetories
        });
    })

}