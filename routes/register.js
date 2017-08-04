
var express = require('express');
var router = express.Router();
var UserSchema = require('../Schemas/UserSchema')
var ProfileSchema = require('../Schemas/ProfileSchema');

/* GET users listing. */

router.get('/', function(req,res,next){
    res.setHeader('Content-Type', 'application/json');
    UserSchema.find(req.query,null, (err,response) =>{
        if(err){
            res.json({
                confirmation: 'fail',
                err: err
            })
        }else{
            if(response.length>0){
                req.session.username = response[0].username;
                console.log(req.session)
            }
            res.json({
                'result': response
            })
        }   
    })
});
router.get('/finduser', function(req,res,next){
    res.setHeader('Content-Type', 'application/json');
    UserSchema.find(req.query,null, (err,response) =>{
        if(err){
            res.json({
                confirmation: 'fail',
                err: err
            })
        }else{
            res.json({
                'result': response
            })
        }   
    })
})
router.post('/signup',function(req,res,next){
    UserSchema.create(req.body,function(err,response){
        if(err){
            res.json({
                added: "fail"
            })
        }else{
            res.json({
                added: 'yes',
                data: response
            })
        }
    })
})
router.post('/profile',function(req,res,next){
    ProfileSchema.create({username: req.body.username}, (err,response)=>{      
    if(err){
        console.log(err)
        res.json({
            confirmation: 'fail',
            error: err
        })
    }else{
        console.log(req.body)
        res.send({
            confirmation: 'success',
            usrnameAdded:  req.body.username
        })
    }
  })

});
module.exports = router;
