var express = require('express');
var router = express.Router();
var CommentSchema = require('../Schemas/CommentSchema');

/* GET home page. */
router.get('/', function(req, res, next) {
  CommentSchema.find(req.query, (err, response) => {
        if(err){
            res.json({
                confirmation: 'fail'
            })
        }else {
            res.json({
                result: response
            })
        }
  })
});
router.post('/', function(req,res,next){
    console.log('req body : ', req.body)
    var newObj = {
        username: req.body.username,
        message: req.body.message,
        time: Date.parse(new Date())
    }
    console.log('req body time', typeof(req.body.time));
    CommentSchema.create(newObj,(err, response) => {
        if(err){
            res.json({
                confirmation: 'fail'
            })
        }else{
            res.json({
                confirmation: 'success'
            })
        }
    })
})

module.exports = router;
