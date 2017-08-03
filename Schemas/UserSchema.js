var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
        fname: {type: String, default: ''},
        lname: {type: String, default: ''},
        username: {type: String, default: ''},
        email: {type: String, default: ''},
        password: {type: String, default: ''},
        phone: {type: String, default: ''},
        state: {type: String, default: ''}
})

module.exports = mongoose.model('Users', UserSchema);