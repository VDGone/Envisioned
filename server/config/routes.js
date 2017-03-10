var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.get('/register', controllers.users.getRegister);
    app.post('/register', controllers.users.postRegister);

    app.get('/login', controllers.users.getLogin);
    app.post('/login', auth.login);
    app.get('/logout', auth.logout);

    app.get('/categories/create', auth.isAuthenticated, controllers.categories.getCreate);
    app.post('/categories/create', auth.isAuthenticated, controllers.categories.postCreate);

    app.get('/profile', auth.isAuthenticated, controllers.users.getProfile);
    app.post('/profile', auth.isAuthenticated, controllers.users.postProfile);

    app.get('/categories/public', controllers.categories.getPublic);
    app.get('/categories/details/:id', controllers.categories.getCategoryById)

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('*', function(req, res) {
        res.render('index');
    });
};