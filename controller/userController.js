const User = require('../model/userModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt= require('jsonwebtoken')
const privatekey= "Ashish@123"



function login(req,res){

    User.findOne({'email':req.body.email.toUpperCase()}).exec()
    .then(userdata=>{
      
        if(userdata == null){
            res.json({
                'status':200,
                'success':false,
                'message':'User not found'
            })
        }else{
            
            if(bcrypt.compareSync(req.body.password,userdata.password))
            {
                const payload ={
                    'id':userdata._id,
                    'email':userdata.email,
                    'name':userdata.name
                }
                const token = jwt.sign(payload,privatekey,{expiresIn:60*20})
                res.json({
                    'status':200,
                    'success':true,
                    'message':'Login Successfully',
                    'token':token,
                    'name':userdata.name,
                    'email':userdata.email

                })    
            }else{
                res.json({
                    'status':200,
                    'success':false,
                    'message':'Invalid Login credential'
                })
            }
        }
    })

    .catch(err=>{
        res.json({
            'status':500,
            'success':false,
            'message':String(err)
        })
    })
} 
module.exports={
    login
}