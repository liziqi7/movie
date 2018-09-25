var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');
var Comment = require('../app/controllers/comment');
var Catetory = require('../app/controllers/catetory');
module.exports = function(app) {
    // pre handle 
    app.use(function(req, res, next) {
        var _user = req.session.user;
        // console.log(_user);
        app.locals.user = _user;
        return next()
    })

    //Index
    app.get('/', Index.index)

    // User
    app.post('/user/signup', User.signup)
    app.post('/user/signin', User.signin)
    app.get('/logout', User.logout)
    app.get('/signin', User.showSignin)
    app.get('/signup', User.showSignup)
    app.get('/admin/user/list', User.signRequired, User.adminRequired, User.list)

    // Movie
    app.get('/movie/:id', Movie.detail)
    app.get('/admin/movie/new', User.signRequired, User.adminRequired, Movie.new)
    app.get('/admin/movie/update/:id', User.signRequired, User.adminRequired, Movie.update)
    app.post('/admin/movie', User.signRequired, User.adminRequired, Movie.save)
    app.get('/admin/movie/list', User.signRequired, User.adminRequired, Movie.list)
    app.delete('/admin/movie/list', User.signRequired, User.adminRequired, Movie.del)

    //Comment
    app.post('/user/comment', User.signRequired, Comment.save)
    console.log('Catetory',Catetory);
    //Catetory
    app.get('/admin/catetory/new', User.signRequired, User.adminRequired, Catetory.new)
    app.post('/admin/catetory', User.signRequired, User.adminRequired, Catetory.save)
    app.get('/admin/catetory/list', User.signRequired, User.adminRequired, Catetory.list)

    // results
    app.get('/results', Index.search)


}