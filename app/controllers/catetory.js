var Catetory = require('../models/catetory') // 载入mongoose编译后的模型catetory
var _ = require('underscore') //_.extend用新对象里的字段替换老的字段


// admin page 后台录入页
exports.new = function(req, res) {
    console.log('req',req);
    res.render('catetory_admin', {
        title: 'imooc 后台分类录入页',
        catetory:{}
    });
}

// admin post movie 后台录入提交
exports.save = function(req, res) {
    var _catetory = req.body.catetory

    var catetory = new Catetory(_catetory)

    catetory.save(function(err, catetory) {
        if (err) console.log(err)
        res.redirect('/admin/catetory/list')
    })

}

 // list page 列表页
 exports.list = function(req, res) {    
     Catetory.fetch(function(err, catetories) {
         if (err) console.log(err)
         res.render('catetorylist', {
             title: 'imooc 分类列表页',
             catetories: catetories
         });
     })
     // }
 }