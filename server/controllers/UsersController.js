var encryption = require('../utilities/encryption');
var users = require('../data/users');

var CONTROLLER_NAME = 'users';

module.exports = {
    getRegister: function (req, res, next) {
        res.render(CONTROLLER_NAME + '/register')
    },
    postRegister: function (req, res, next) {
        var newUserData = req.body;
        // if (newUserData.password.length < 6 || newUserData.password.length > 20) {
        //     req.session.error = 'Password must be between 6 and 20 symbols!';
        //     res.redirect('/register');
        // }
        if (newUserData.password != newUserData.confirmPassword) {
            req.session.error = 'Passwords do not match!';
            res.redirect('/register');
        }
        else {
            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            users.create(newUserData, function (err, user) {
                if (err) {
                    console.log('Failed to register new user: ' + err);
                    return;
                }

                req.logIn(user, function (err) {
                    if (err) {
                        res.status(400);
                        return res.send({ reason: err.toString() }); // TODO:
                    }
                    else {
                        res.redirect('/');
                    }
                })
            });
        }
    },
    getLogin: function (req, res, next) {
        res.render(CONTROLLER_NAME + '/login');
    },
    getProfile: function (req, res, next) {
        res.render(CONTROLLER_NAME + '/profile');
    },
    postProfile: function (req, res, next) {
        var newUserData = req.body;
        users.create(newUserData, function (err, user) {
            if (err) {
                console.log('Failed to register new user: ' + err);
                return;
            }

            req.logIn(user, function (err) {
                if (err) {
                    res.status(400);
                    return res.send({ reason: err.toString() }); // TODO:
                }
                else {
                    res.redirect('/');
                }
            })
        });
    },
    updateUser: function (req, res, next) {
        if (req.user._id == req.body._id) {
            var updatedUserData = req.body;
            if (updatedUserData.password && updatedUserData.password.length > 0) {
                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            }

            User.update({ _id: req.body._id }, updatedUserData, function () {
                res.end();
            })
        }
        else {
            res.send({ reason: 'You do not have permissions!' })
        }
    },
};