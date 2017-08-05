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
router.put('/profile/addfriend/:target',function(req,res,next){
    console.log("OK CALLED")
    ProfileSchema.findOne({username: req.params.target},function(err,data){
        if(err){
            res.json({
                confirmation: 'fail',
                err: err
            })
        }else{
            if(data == null){
                res.json({
                    confirmation: 'fail',
                    message: 'User not available'
                })
                return;
            }
            var friendList = data.friends;
            if(friendList.indexOf(req.session.username)<0){
                friendList.push(req.session.username);
            }else{
                res.json({
                    confirmation: 'already ther',
                    message: "User already Friend!"
                })
                return;
            }
            data.friends = friendList;
            data.save((err, updatedObj)=>{
                 ProfileSchema.findOne({username: req.session.username},function(err,data){
                    if(err){
                        res.json({
                            confirmation: 'fail',
                            message: "Error Occured"
                        })
                    }else{
                        var friendList = data.friends;
                        if(friendList.indexOf(req.params.target)<0){
                            friendList.push(req.params.target);
                        }
                        data.friends = friendList;
                        data.save((err, updatedObj)=>{
                            res.json({
                                confirmation: 'success',
                                message: "User added to Friend list!"
                            })
                        })
                    }
                })
            })
        }
    })
   
})
router.get('/logout', function(req,res,next){
    req.session.destroy();
})
router.get('/profile', function(req,res,next){
    ProfileSchema.find({username: req.query.username}, (err,response) => {
        if(err){
            res.json({
                confirmation: 'fail',
                error: err
            })
        }else{
            res.json({
                confirmation: 'success',
                result: response
            })
        }
    });
});
router.post('/profile',function(req,res,next){
    ProfileSchema.create({username: req.body.username}, (err,response) => {      
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
