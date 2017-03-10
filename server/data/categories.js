var Category = require('mongoose').model('Category');

module.exports = {
    create: function (category, user, callback) {
        if (category.title < 0 || category.title == undefined || category.description < 0) {
            callback('Invalid category or description!');
            return;
        }

        category.creator = user.username;
        category.date = new Date();
        category.date.setMonth(4); // TODO: fix

        Category.create(category, callback);
    },
    publicCategories: function (page, pageSize, callback) {
        page = page || 1;
        pageSize = pageSize || 9;
        Category
            .find({})
            .sort({
                date: 'desc'
            })
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .exec(function (err, foundCategories) {
                if (err) {
                    callback(err);
                    return;
                }

                Category.count().exec(function (err, numberOfCategories) {
                    callback(err, {
                        categories: foundCategories,
                        currentPage: page,
                        pageSize: pageSize,
                        total: numberOfCategories
                    });
                });
            })
    },
    getById: function (id, category, callback) {
        Category.findById(id.toString(), (err, category) => {
            if (err) {
                callback("Not found! " + err);
            }
            if (!category) {
                callback(err);
            } else {
                var data = {
                    id: category.id,
                    title: category.title,
                    //items: category.items,
                    description: category.description,
                    picture: category.picture
                };
                callback(err, data)
            }
        })
    }
};