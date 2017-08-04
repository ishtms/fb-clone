var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
        username: {type: String, default: ''},
        picture:{type:String, default: 'http://www.missingkids.com/missingkids/images/poster/en_US/noPhotoAvailable.jpg'},
        friends: {type: Array, default: []},
        messages: {type:Object, default:{}},
        status: {type: Object,default: []}
})

module.exports = mongoose.model('Profile', ProfileSchema);