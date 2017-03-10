var categories = require('../data/categories');

var CONTROLLER_NAME = 'categories';

function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth();

    var yyyy = today.getFullYear();
    //if (dd < 10) {
    //    dd = '0' + dd
    //}
    //
    //if (mm < 10) {
    //    mm = '0' + mm
    //}

    return dd + '-' + mm + '-' + yyyy;
}

module.exports = {
    getCreate: function (req, res) {
        var category = req.body;
        res.render(CONTROLLER_NAME + '/create', {
            title: category.title,
            description: category.description,
            picture: category.picture
        });
    },

    getPublic: function (req, res) {
        var page = req.query.page;
        var pageSize = req.query.pageSize;

        categories.publicCategories(page, pageSize, function (err, data) {
            res.render(CONTROLLER_NAME + '/public', {
                data: data
            });
        });
    },
    getCategoryById: function (req, res) {
        let id = req.params.id;
        let category = req.body;
        categories.getById(id, category, function (err, data) {
            res.render(CONTROLLER_NAME + '/details', {
                data: data
            });
        });
    },
    postCreate: function (req, res) {
        var category = req.body;
        var user = req.user;
        categories.create(
            category,
            {
                username: user.username
            },
            function (err, category) {
                if (err) {
                    var data = {
                        title: category.title,
                        description: category.description,
                        picture: category.picture,
                        errorMessage: err
                    };
                    res.render(CONTROLLER_NAME + '/create', data);
                }
                else {
                    res.redirect(CONTROLLER_NAME + '/details/' + category._id);
                    console.log(JSON.stringify(category));
                }
            })
    },
};