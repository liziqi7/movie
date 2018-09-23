var mongoose = require('mongoose');
var CatetorySchema = require('../schemas/catetory'); //引入'../schemas/user.js'导出的模式模块

// 编译生成User模型
var Catetory  = mongoose.model('Catetory', CatetorySchema);

// 将User模型[构造函数]导出
module.exports = Catetory;