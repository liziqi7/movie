var mongoose = require('mongoose');
var commentSchema = require('../schemas/comment'); //引入'../schemas/comment.js'导出的模式模块

// 编译生成Comment模型
var Comment  = mongoose.model('Comment', commentSchema);

// 将Comment模型[构造函数]导出
module.exports = Comment;