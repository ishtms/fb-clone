var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.session.username)
  res.json({
      result: req.session.username
  })
});

module.exports = router;
