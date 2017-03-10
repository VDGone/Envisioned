var mongoose = require('mongoose');

module.exports.init = function () {
    var categorySchema = mongoose.Schema({
        title: { type: String },
        description: { type: String },
        picture: [{ type: String }],
        date: { type: Date },
        creator: { type: String },
        comments: [{
            username: String,
            content: String
        }]
    });

    var Category = mongoose.model('Category', categorySchema);
};



