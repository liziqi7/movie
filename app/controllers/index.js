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
// search page
exports.search = function(req, res) {
    var catId = req.query.cat;
    var page = Number(req.query.p);
    var count = 1;
    var index = page * count;
    console.log();
    Catetory.find({ _id: catId }).populate({ path: 'movies', potions: { limit: 1, skip: index } }).exec(function(err, catetories) {
        if (err) console.log(err)
        console.log('------------------------')
        console.log('catetories', catetories);
        var catetory = catetories[0] || {};
        var movies = catetory.movies || [];
        var results = movies.slice(index, index + count);
        res.render('results', { // 渲染index 首页
            title: 'imooc 结果列表页面',
            keyword: catetory.name,
            currentPage: page + 1,
            catId:catId,
            totalPage: Math.ceil(movies.length / count),
            movies: results
        });
    })

}