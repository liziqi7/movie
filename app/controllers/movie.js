var Movie = require('../models/movie') // 载入mongoose编译后的模型Movie
var User = require('../models/user') // 载入mongoose编译后的模型User
var Catetory = require('../models/catetory') // 载入mongoose编译后的模型Catetory
var Comment = require('../models/comment') // 载入mongoose编译后的模型Comment
var _ = require('underscore') //_.extend用新对象里的字段替换老的字段
var fs = require('fs');
var path = require('path');



// detail page 详情页
exports.detail = function(req, res) {
    var id = req.params.id;
    Movie.findById(id, function(err, movie) {
        Comment.find({ movie: id })
            .populate('from', 'name')
            .populate('reply.from reply.to', 'name')
            .exec(function(err, comments) {
                res.render('detail', {
                    title: 'i_movie' + movie.title,
                    movie: movie,
                    comments: comments
                });
            })
    });
};


// admin page 后台录入页
exports.new = function(req, res) {
    Catetory.find({}, function(err, catetories) {
        res.render('admin', {
            title: 'imooc 后台录入页',
            catetories: catetories,
            movie: {}
        });
    })
}
// admin update movie 后台更新页
exports.update = function(req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function(err, movie) {
            Catetory.find({}, function(err, catetories) {
                if (err) console.log(err)
                res.render("admin", {
                    title: 'imooc 后台更新页',
                    movie: movie,
                    catetories: catetories
                })
            })
        })
    }
}
exports.savePoster = function(req, res, next) {

    var posterData = req.files.uploadPoster;
    var filePath = posterData.path;
    var originalFilename = posterData.originalFilename;
    if (originalFilename) {
        fs.readFile(filePath, function(err, data) {
            var timestamp = Date.now();
            var type = posterData.type.split('/')[1];
            var poster = timestamp + '.' + type
            var newPath = path.join(__dirname, '../../', '/public/upload/' + poster);
            console.log(newPath);
            fs.writeFile(newPath, data, function(err) {
                req.poster = '/upload/' + poster;
                next();
            })
        })
    } else {
        next();
    }

}
// admin post movie 后台录入提交
exports.save = function(req, res) {
    var id = req.body.movie._id
    var movieObj = req.body.movie
    var _movie;
    if (req.poster) {
        movieObj.poster = req.poster;
    }
    if (id) { // 已经存在的电影数据
        Movie.findById(id, function(err, movie) {
            if (err) console.log(err)
            _movie = _.extend(movie, movieObj); // 用新对象里的字段替换老的字段
            _movie.save(function(err, movie) {
                if (err) console.log(err)
                res.redirect('/movie/' + movie._id)
            })
        })
    } else {
        _movie = new Movie(movieObj);
        console.log('--------------------');
        // console.log('_movie', _movie);
        console.log(movieObj);
        var catetoryId = movieObj.catetory;
        var catetoryName = movieObj.catetoryName;
        _movie.save(function(err, movie) {
            if (err) console.log(err)

            if (catetoryId) {
                Catetory.update({ _id: catetoryId }, { $push: { movies: movie._id } }, function(err, catetory) {
                    if (err) console.log(err);
                    res.redirect('/movie/' + movie._id)
                });
            } else if (catetoryName) {
                var catetory = new Catetory({
                    name: catetoryName,
                    movies: [movie._id]
                });
                catetory.save(function(err, catetory) {
                    if (err) console.log(err);
                    movie.catetory = catetory._id;
                    movie.save(function(err, catetory) {
                        res.redirect('/movie/' + movie._id)
                    })

                })
            }
            // Catetory.findById(catetoryId, function(err, catetory) {
            //     catetory.movies.push(_movie.id);
            //     catetory.save(function(err, catetory) {
            //         res.redirect('/movie/' + movie._id)
            //     })
            // })
        })
    }
}
// list page 列表页
exports.list = function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) console.log(err)
        res.render('list', {
            title: 'imooc 列表页',
            movies: movies
        });
    })
}
// list delete movie data 列表页删除电影
exports.del = function(req, res) {
    var id = req.query.id

    if (id) {
        Movie.remove({ _id: id }, function(err, movie) {
            if (err) {
                console.log(err)
            } else {
                res.json({ success: 1 })
            }
        })
    }
}