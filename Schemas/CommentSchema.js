var mongoose = require('mongoose');

let CommentSchema = new mongoose.Schema({
    username: {type: String, default: 'User'},
    message: {type: String, default: ''},
    time: {type: Object, default: new Date()}
})

module.exports = mongoose.model('CommentSchema', CommentSchema);