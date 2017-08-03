
var express = require('express');
var router = express.Router();
var UserSchema = require('../Schemas/UserSchema')
/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log("REQUEST\n\n\n\n\n\n\n\n\n",req.body);
  UserSchema.create(req.body, (err,response)=>{      
    if(err){
        console.log(err)
        res.json({
            confirmation: 'fail',
            error: err
        })
    }else{
        console.log(req.body)
        res.send({
            conirmation: 'success',
            dataAdded: response
        })
    }
  })
});
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
module.exports = router;
