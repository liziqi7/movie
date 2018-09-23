var Comment = require('../models/comment') // 载入mongoose编译后的模型Comment


// 
exports.save = function(req, res) {
    var _comment = req.body.comment;
    var movieId = _comment.movie;
    if (_comment.cid) {
        Comment.findById(_comment.cid, function(err, comment) {
            var reply = {
                from: _comment.from,
                to: _comment.tid,
                content: _comment.content
            }
            Comment.update({ _id: _comment.cid }, { $push: { reply: reply } }, function(err, comment) {
                if (err) console.log(err);
                res.redirect('/movie/' + movieId)
            });
        })
    } else {
        var comment = new Comment(_comment)
        comment.save(function(err, comment) {
            if (err) console.log(err)
            res.redirect('/movie/' + movieId)
        })
    }
}