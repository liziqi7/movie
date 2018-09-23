 var User = require('../models/user') // 载入mongoose编译后的模型User

 exports.showSignup = function(req, res) {
     res.render('signup', {
         'title': '注册页面'
     })
 }

 exports.showSignin = function(req, res) {
     res.render('signin', {
         'title': '登陆页面'
     })
 }

 //signup
 exports.signup = function(req, res) {
     // req.param('user') 优先级：params>body>query
     //'/user/signup/:userid' 获取方式：req.params.userid
     //'/user/signup/1111?userid=a' 获取方式：req.query.userid
     var _user = req.body.user;
     var name = _user.name;
     User.findOne({ name: _user.name }, function(err, user) {
         if (err) console.log(err);
         // console.log(user);
         // 如果用户不存在，则允许注册   
         if (!user) {
             user = new User(_user);
             user.save(function(err, user) {
                 if (err) console.log(err);
                 res.redirect('/')
             })
         } else {
             console.log('User already exist');
             return res.redirect('/signin')
         }
     })
 }

 //signin
 exports.signin = function(req, res) {
     var _user = req.body.user;
     var name = _user.name;
     var password = _user.password;
     User.findOne({ name: name }, function(err, user) {
         if (err) console.log(err);
         if (!user) {
             // console.log('User not exist');
             return res.redirect('/signup')
         }
         user.comparePassword(password, function(err, isMatch) {
             if (err) console.log(err);
             console.log(isMatch);
             if (isMatch) {
                 // console.log('Password is matched');
                 req.session.user = user;
                 return res.redirect('/')
             } else {
                 // console.log('Password is not matched');
                 return res.redirect('/signin')
                 // return res.redirect('/')
             }
         })

     })
 }

 // logout
 exports.logout = function(req, res) {
     var user = req.session.user;
     if (!user) {
         return res.redirect('/')
     }
     delete req.session.user;
     // delete app.locals.user;
     res.redirect('/')
 }

 // list page 列表页
 exports.list = function(req, res) {
     // var user = req.session.user
     // if(!user){
     //    return res.redirect('/signin')
     // }
     // if (user.role > 10) {
     User.fetch(function(err, users) {
         if (err) console.log(err)
         res.render('userlist', {
             title: 'imooc 用户列表页',
             users: users
         });
     })
     // }
 }
 exports.signRequired = function(req, res, next) {
     var user = req.session.user
     if (!user) {
         return res.redirect('/signin')
     }
     next()
     if (user.role > 10) {

     }
 }
 exports.adminRequired = function(req, res, next) {
     var user = req.session.user

     if (!user.role || user.role <= 10) {
         return res.redirect('/signin')
     }
     next()
 }