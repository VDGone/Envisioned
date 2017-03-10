var mongoose = require('mongoose'),
    encryption = require('../../utilities/encryption');

var requiredMessage = '{PATH} is required';
var defaultPicture = 'http://www.freelanceme.net/Images/default%20profile%20picture.png';

module.exports.init = function() {
    var userSchema = mongoose.Schema({
        username: { type: String, required: requiredMessage, unique: true },
        salt: String,
        hashPass: String,
        firstName: { type: String, required: requiredMessage},
        lastName: { type: String, required: requiredMessage},
        email: { type: String, required: requiredMessage },
        faceBook: { type: String },
        youtube: {type: String},
        profilePicture: { type: String, default: defaultPicture }
    });

    userSchema.method({
        authenticate: function(password) {
            if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
                return true;
            }
            else {
                return false;
            }
        }
    });

    var User = mongoose.model('User', userSchema);
};


