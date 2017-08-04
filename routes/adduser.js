

var express = require('express');
var router = express.Router();
var ProfileSchema = require('../Schemas/ProfileSchema');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({
        user: req.session.username
    })
});

module.exports = router;
