var mongoose = require('mongoose');
var UserSchema = require('../schemas/user'); //引入'../schemas/user.js'导出的模式模块

// 编译生成User模型
var User  = mongoose.model('User', UserSchema);

// 将User模型[构造函数]导出
module.exports = User;